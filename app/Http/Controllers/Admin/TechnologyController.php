<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\LogsActivity;

class TechnologyController extends Controller
{
    use LogsActivity;

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

        $technology = Technology::create([
            'name' => $request->name,
            'group' => $request->group,
            'synonyms' => $request->synonyms,
        ]);

        $this->logActivity('created', $technology, null, $technology->toArray());

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
        $old = $technology->toArray();

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

        $new = $technology->toArray();
        $this->logActivity('updated', $technology, $old, $new);

        return redirect()->route('admin.technologies.index')->with('success', 'Технология обновлена');
    }

    // Удалить технологию
    public function destroy($id)
    {
        $technology = Technology::findOrFail($id);
        $old = $technology->toArray();

        $technology->delete();

        $this->logActivity('deleted', null, $old, null);

        return redirect()->route('admin.technologies.index')->with('success', 'Технология удалена');
    }
}