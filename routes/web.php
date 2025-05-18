<?php

use App\Http\Controllers\LetterController;
use App\Http\Controllers\TypeLetterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('surat')->group(function () {
        Route::get('/daftar-surat', [LetterController::class, 'index'])->name('daftar-surat');
        Route::resource('jenis-surat', TypeLetterController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
