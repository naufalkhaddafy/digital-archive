<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\LetterController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TypeLetterController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('surat')->group(function () {
        Route::get('/daftar-surat', [LetterController::class, 'index'])->name('daftar-surat');
        Route::resource('jenis-surat', TypeLetterController::class)->except(['show', 'edit', 'create']);
        Route::get('/tambah-surat-masuk', [LetterController::class, 'letterIn'])->name('tambah.surat.masuk');
        Route::get('/tambah-surat-keluar', [LetterController::class, 'letterOut'])->name('tambah.surat.keluar');
        Route::get('/{letter}/edit-surat-masuk', [LetterController::class, 'letterInEdit'])->name('edit.surat.masuk');
        Route::get('/{letter}/edit-surat-keluar', [LetterController::class, 'letterOutEdit'])->name('edit.surat.keluar');
        Route::post('/store', [LetterController::class, 'store'])->name('surat.store');
        Route::patch('/{letter}/update', [LetterController::class, 'update'])->name('surat.update');
        Route::get('/{type:slug}', [LetterController::class, 'show'])->name('surat.show');
        Route::delete('/{letter}/destroy', [LetterController::class, 'destroy'])->name('surat.destroy');
    });


    Route::resource('/dokumen', DocumentController::class)->except(['show'])->parameters([
        'dokumen' => 'document'
    ]);

    Route::get('/dokumen-terhapus', [DocumentController::class, 'removed'])->name('dokumen.remove');

    Route::patch('/dokumen-terhapus/{id}/restore', [DocumentController::class, 'restore'])->name('dokumen.restore');

    Route::get('/dokumen/settings', [SettingController::class, 'index'])->name('dokumen.settings.index');
    Route::patch('/dokumen/retensi/update', [SettingController::class, 'update'])->name('dokumen.settings.update');

    Route::resource('pengguna', UserController::class)->except(['show', 'edit', 'create'])->middleware('role:admin');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
