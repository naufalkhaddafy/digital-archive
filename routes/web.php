<?php

use App\Http\Controllers\DocumentController;
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
        Route::resource('jenis-surat', TypeLetterController::class)->except(['show', 'edit', 'create']);
        Route::get('/tambah-surat-masuk', [LetterController::class, 'letterIn'])->name('tambah.surat.masuk');
        Route::get('/tambah-surat-keluar', [LetterController::class, 'letterOut'])->name('tambah.surat.keluar');
        Route::get('/{id}/edit-surat-masuk', [LetterController::class, 'letterInEdit'])->name('tambah.surat.masuk');
        Route::get('/edit-surat-keluar', [LetterController::class, 'letterOutEdit'])->name('tambah.surat.keluar');
    });

    Route::resource('/dokumen', DocumentController::class)->except(['show', 'edit', 'create'])->parameters([
        'dokumen' => 'document'
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
