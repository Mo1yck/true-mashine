<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Traits\LogsActivity;

class UserController extends Controller
{
    use LogsActivity;

    // Список пользователей
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users', ['users' => $users]);
    }

    // Форма создания
    public function create()
    {
        return Inertia::render('Admin/UsersCreate');
    }

    // Сохранить пользователя
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'role' => 'required|in:admin,manager,director',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $this->logActivity('created', $user, null, $user->toArray());

        return redirect()->route('admin.users.index')->with('success', 'Пользователь создан');
    }

    // Форма редактирования
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Admin/UsersEdit', ['user' => $user]);
    }

    // Обновить пользователя
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $currentUser = auth()->user();
        $old = $user->toArray();

        // Если не админ — редактирует только себя
        if ($currentUser->role !== 'admin' && $currentUser->id !== $user->id) {
            abort(403, 'Нет доступа');
        }

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ];

        // Если админ — может менять роль
        if ($currentUser->role === 'admin') {
            $rules['role'] = 'required|in:admin,manager,director';
        }

        $request->validate($rules);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        // Если админ — добавляем роль
        if ($currentUser->role === 'admin') {
            $data['role'] = $request->role;
        }

        // Если передан пароль — меняем
        if ($request->filled('password')) {
            $request->validate(['password' => 'min:8|confirmed']);
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        $new = $user->toArray();

        $this->logActivity('updated', $user, $old, $new);

        return redirect()->route('admin.users.index')->with('success', 'Пользователь обновлён');
    }

    // Удалить пользователя
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $currentUser = auth()->user();
        $old = $user->toArray();

        // Только админ может удалять
        if ($currentUser->role !== 'admin') {
            abort(403, 'Нет доступа');
        }

        if ($user->role === 'admin') {
            return back()->with('error', 'Нельзя удалить администратора');
        }

        if ($user->id === $currentUser->id) {
            return back()->with('error', 'Нельзя удалить самого себя');
        }

        $user->delete();

        $this->logActivity('deleted', null, $old, null);

        return redirect()->route('admin.users.index')->with('success', 'Пользователь удалён');
    }
}