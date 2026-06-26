<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CandidateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ============================================
// ГЛАВНАЯ И ДАШБОРД
// ============================================

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ============================================
// ПРОФИЛЬ
// ============================================

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ============================================
// АДМИНКА (пользователи и технологии)
// ============================================

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('admin.users.create');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::resource('technologies', TechnologyController::class)->names('admin.technologies');
});

// ============================================
// ЗАПРОСЫ
// ============================================

// Просмотр запросов (для всех авторизованных)
Route::middleware(['auth'])->group(function () {
    Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
    Route::get('/requests/create', [RequestController::class, 'create'])->name('requests.create');
    Route::get('/requests/{id}/edit', [RequestController::class, 'edit'])->name('requests.edit');
    Route::get('/requests/{id}/candidates', [RequestController::class, 'candidates'])->name('requests.candidates');
    Route::get('/requests/{id}', [RequestController::class, 'show'])->name('requests.show');
});

// Управление запросами (только админ и менеджер)
Route::middleware(['auth', 'role:admin,manager'])->group(function () {
    Route::post('/requests', [RequestController::class, 'store'])->name('requests.store');
    Route::put('/requests/{id}', [RequestController::class, 'update'])->name('requests.update');
    Route::delete('/requests/{id}', [RequestController::class, 'destroy'])->name('requests.destroy');
});

// ============================================
// КАНДИДАТЫ
// ============================================

// Просмотр кандидатов (для всех авторизованных)
Route::middleware(['auth'])->group(function () {
    Route::get('/candidates', [CandidateController::class, 'index'])->name('candidates.index');
    Route::get('/candidates/create', [CandidateController::class, 'create'])->name('candidates.create');
    Route::get('/candidates/{id}/edit', [CandidateController::class, 'edit'])->name('candidates.edit');
    Route::get('/candidates/{id}', [CandidateController::class, 'show'])->name('candidates.show');
});

// Управление кандидатами (только админ и менеджер)
Route::middleware(['auth', 'role:admin,manager'])->group(function () {
    Route::post('/candidates', [CandidateController::class, 'store'])->name('candidates.store');
    Route::put('/candidates/{id}', [CandidateController::class, 'update'])->name('candidates.update');
    Route::delete('/candidates/{id}', [CandidateController::class, 'destroy'])->name('candidates.destroy');
    Route::post('/candidates/{id}/match', [CandidateController::class, 'match'])->name('candidates.match');
});

// ============================================
// ОТЧЁТЫ (PDF) — только руководитель и админ
// ============================================

Route::middleware(['auth', 'role:admin,director'])->group(function () {
    Route::get('/report/candidate/{id}', [ReportController::class, 'candidatePdf'])->name('report.candidate.pdf');

    Route::get('/temp/{filename}', function ($filename) {
        $path = storage_path('app/temp/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    });
});

// ============================================
// АВТОРИЗАЦИЯ (Breeze)
// ============================================

require __DIR__.'/auth.php';