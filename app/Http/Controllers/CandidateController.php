<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Request;
use App\Models\Technology;
use App\Services\MatchService;
use Illuminate\Http\Request as HttpRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Spatie\PdfToText\Pdf;
use PhpOffice\PhpWord\IOFactory;

class CandidateController extends Controller
{
    // Список кандидатов
    public function index()
    {
        $candidates = Candidate::with(['request', 'uploadedBy'])->get();
        return Inertia::render('Candidates/Index', ['candidates' => $candidates]);
    }

    // Форма загрузки
    public function create()
    {
        $requests = Request::where('status', 'active')->get();
        return Inertia::render('Candidates/Create', ['requests' => $requests]);
    }

    // Загрузка и парсинг
    public function store(HttpRequest $request)
{
    $request->validate([
        'request_id' => 'required|exists:requests,id',
        'file' => 'required|file|mimes:pdf,doc,docx|max:15360',
    ]);

    $file = $request->file('file');
    $path = $file->store('candidates', 'public');

    // Извлечение текста
    $fullPath = storage_path('app/public/' . $path);
    $text = $this->extractText($fullPath, $file->getClientOriginalExtension());

    // === НОВАЯ ПРОВЕРКА ===
    if (empty(trim($text))) {
        Storage::disk('public')->delete($path);
        return back()->withErrors([
            'file' => 'Не удалось распознать текст из файла. Убедитесь, что файл содержит текст, и попробуйте снова.'
        ])->withInput();
    }

    // Поиск технологий в тексте
    $technologies = Technology::all();
    $foundSkills = [];

    foreach ($technologies as $tech) {
        $keywords = array_merge([$tech->name], $tech->synonyms ?? []);
        foreach ($keywords as $keyword) {
            if (stripos($text, $keyword) !== false) {
                $foundSkills[] = $tech->id;
                break;
            }
        }
    }

    // Сохранение кандидата
    $candidate = Candidate::create([
        'request_id' => $request->request_id,
        'file_path' => $path,
        'extracted_text' => $text,
        'skills' => $foundSkills,
        'uploaded_by' => auth()->id(),
        'status' => 'processed',
    ]);

    foreach ($foundSkills as $techId) {
        $candidate->candidateSkills()->create([
            'technology_id' => $techId,
        ]);
    }

    return redirect()->route('candidates.index')->with('success', 'Резюме загружено и обработано');
}

    private function extractText($path, $extension)
{
    $text = '';

    if ($extension === 'pdf') {
        $text = Pdf::getText($path, 'V:\poppler\bin\pdftotext.exe');
    } elseif (in_array($extension, ['doc', 'docx'])) {
        // DOCX — через ZipArchive
        $text = $this->extractTextFromDocx($path);
    }

    return $text;
}

private function extractTextFromDocx($path)
{
    $text = '';
    $zip = new \ZipArchive();
    
    if ($zip->open($path) === true) {
        $content = $zip->getFromName('word/document.xml');
        if ($content) {
            $text = strip_tags($content);
            $text = html_entity_decode($text);
            $text = preg_replace('/\s+/', ' ', $text);
            $text = trim($text);
        }
        $zip->close();
    }
    
    return $text;
}

    public function show($id)
{
    $candidate = Candidate::with([
        'request',
        'uploadedBy',
        'candidateSkills.technology',
        'assessment'
    ])->findOrFail($id);

    return Inertia::render('Candidates/Show', ['candidate' => $candidate]);
}

public function match($id)
{
    $candidate = Candidate::findOrFail($id);

    if (!$candidate->request_id) {
        return back()->with('error', 'Кандидат не привязан к запросу');
    }

    $matchService = new MatchService();
    $assessment = $matchService->calculate($candidate->request_id, $candidate->id);

    return redirect()->route('candidates.show', $candidate->id)
        ->with('success', 'Сверка выполнена! Покрытие: ' . $assessment->total_score . '%');
}
}