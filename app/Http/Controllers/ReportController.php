<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function candidatePdf($id)
    {
        $candidate = Candidate::with([
            'request',
            'request.requirements',
            'candidateSkills.technology',
            'assessment'
        ])->findOrFail($id);

        $pdf = Pdf::loadView('pdf.candidate-report', [
            'candidate' => $candidate,
        ]);

        // Сохраняем в storage/temp
        $filename = 'candidate-report-' . $candidate->id . '.pdf';
        $path = storage_path('app/temp/' . $filename);
        
        // Создаём папку если нет
        if (!file_exists(storage_path('app/temp/'))) {
            mkdir(storage_path('app/temp/'), 0777, true);
        }
        
        $pdf->save($path);

        // РЕДИРЕКТИМ НА ФАЙЛ (браузер сам поймёт что это PDF)
        return redirect()->to('/temp/' . $filename);
    }
}