<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    // Список технологий
    public function index()
    {
        $technologies = Technology::all();
        return Inertia::render('Admin/Technologies', ['technologies' => $technologies]);
    }

    // Форма создания
    public function create()
    {
        return Inertia::render('Admin/TechnologiesCreate');
    }

    // Сохранить технологию
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:technologies',
            'group' => 'nullable|string|max:255',
            'synonyms' => 'nullable|array',
            'synonyms.*' => 'string|max:255',
        ]);

        Technology::create([
            'name' => $request->name,
            'group' => $request->group,
            'synonyms' => $request->synonyms,
        ]);

        return redirect()->route('admin.technologies.index')->with('success', 'Технология создана');
    }

    // Форма редактирования
    public function edit($id)
    {
        $technology = Technology::findOrFail($id);
        return Inertia::render('Admin/TechnologiesEdit', ['technology' => $technology]);
    }

    // Обновить технологию
    public function update(Request $request, $id)
    {
        $technology = Technology::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:technologies,name,' . $technology->id,
            'group' => 'nullable|string|max:255',
            'synonyms' => 'nullable|array',
            'synonyms.*' => 'string|max:255',
        ]);

        $technology->update([
            'name' => $request->name,
            'group' => $request->group,
            'synonyms' => $request->synonyms,
        ]);

        return redirect()->route('admin.technologies.index')->with('success', 'Технология обновлена');
    }

    // Удалить технологию
    public function destroy($id)
    {
        $technology = Technology::findOrFail($id);
        $technology->delete();

        return redirect()->route('admin.technologies.index')->with('success', 'Технология удалена');
    }
}