<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\Technology;
use Illuminate\Http\Request as HttpRequest;
use Inertia\Inertia;

class RequestController extends Controller
{
    // Список запросов
    public function index()
    {
        $requests = Request::with(['createdBy', 'requirements'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Requests/Index', ['requests' => $requests]);
    }

    // Форма создания
    public function create()
    {
        $technologies = Technology::orderBy('name')->get();
        return Inertia::render('Requests/Create', [
            'technologies' => $technologies
        ]);
    }

    // Сохранить запрос
    public function store(HttpRequest $request)
    {
        $request->validate([
            'position' => 'required|string|max:255',
            'description' => 'nullable|string',
            'grade' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'citizenship' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'status' => 'required|in:draft,active,closed',
            'requirements' => 'required|array|min:1',
            'requirements.*.type' => 'required|in:must_have,nice_to_have',
            'requirements.*.technology_id' => 'nullable|exists:technologies,id',
            'requirements.*.custom_text' => 'nullable|string|max:255',
            'requirements.*.weight' => 'nullable|integer|min:1|max:100',
        ]);

        // Создаём запрос
        $newRequest = Request::create([
            'position' => $request->position,
            'description' => $request->description,
            'grade' => $request->grade,
            'location' => $request->location,
            'citizenship' => $request->citizenship,
            'release_date' => $request->release_date,
            'status' => $request->status,
            'created_by' => auth()->id(),
        ]);

        // Добавляем требования
        foreach ($request->requirements as $req) {
            $newRequest->requirements()->create([
                'technology_id' => $req['technology_id'] ?? null,
                'custom_text' => $req['custom_text'] ?? null,
                'type' => $req['type'],
                'weight' => $req['weight'] ?? ($req['type'] === 'must_have' ? 2 : 1),
            ]);
        }

        return redirect()->route('requests.index')->with('success', 'Запрос создан');
    }

    // Просмотр запроса
    public function show($id)
    {
        $request = Request::with(['requirements.technology', 'createdBy', 'candidates'])
            ->findOrFail($id);

        return Inertia::render('Requests/Show', ['request' => $request]);
    }

    // Форма редактирования
    public function edit($id)
    {
        $request = Request::with('requirements')->findOrFail($id);
        $technologies = Technology::orderBy('name')->get();

        return Inertia::render('Requests/Edit', [
            'request' => $request,
            'technologies' => $technologies,
        ]);
    }

    // Обновить запрос
    public function update(HttpRequest $request, $id)
    {
        $existingRequest = Request::findOrFail($id);

        $request->validate([
            'position' => 'required|string|max:255',
            'description' => 'nullable|string',
            'grade' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'citizenship' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'status' => 'required|in:draft,active,closed',
            'requirements' => 'required|array|min:1',
            'requirements.*.type' => 'required|in:must_have,nice_to_have',
            'requirements.*.technology_id' => 'nullable|exists:technologies,id',
            'requirements.*.custom_text' => 'nullable|string|max:255',
            'requirements.*.weight' => 'nullable|integer|min:1|max:100',
        ]);

        // Обновляем запрос
        $existingRequest->update([
            'position' => $request->position,
            'description' => $request->description,
            'grade' => $request->grade,
            'location' => $request->location,
            'citizenship' => $request->citizenship,
            'release_date' => $request->release_date,
            'status' => $request->status,
        ]);

        // Удаляем старые требования и добавляем новые
        $existingRequest->requirements()->delete();

        foreach ($request->requirements as $req) {
            $existingRequest->requirements()->create([
                'technology_id' => $req['technology_id'] ?? null,
                'custom_text' => $req['custom_text'] ?? null,
                'type' => $req['type'],
                'weight' => $req['weight'] ?? ($req['type'] === 'must_have' ? 2 : 1),
            ]);
        }

        return redirect()->route('requests.index')->with('success', 'Запрос обновлён');
    }

    // Удалить запрос
    public function destroy($id)
    {
        $request = Request::findOrFail($id);

        // Проверяем, есть ли у запроса кандидаты
        if ($request->candidates()->count() > 0) {
            return back()->with('error', 'Нельзя удалить запрос с кандидатами');
        }

        $request->requirements()->delete();
        $request->delete();

        return redirect()->route('requests.index')->with('success', 'Запрос удалён');
    }
    
    public function candidates($id)
{
    $request = Request::with(['candidates' => function ($query) {
        $query->with('candidateSkills.technology', 'uploadedBy');
    }])->findOrFail($id);

    // Сортируем кандидатов по проценту (по убыванию)
    $candidates = $request->candidates
        ->sortByDesc('match_score')
        ->values();

    return Inertia::render('Requests/Candidates', [
        'request' => $request,
        'candidates' => $candidates,
    ]);
}
}