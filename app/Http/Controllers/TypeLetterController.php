<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTypeLetterRequest;
use App\Models\TypeLetter;
use App\Http\Requests\TypeLetterRequest;

class TypeLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typeLetters = TypeLetter::query()->latest()->get();
        return inertia('Surat/Jenis', [
            'typeLetters' => $typeLetters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TypeLetterRequest $request)
    {

        $request->user()->typeLetters()->create($request->validated());

        flashMessage('Success', 'Berhasil menambahkan jenis surat');

        return redirect()->route('jenis-surat.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypeLetter $typeLetter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypeLetter $typeLetter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TypeLetterRequest $request, $typeLetter)
    {
        $typeLetter = TypeLetter::find($typeLetter);
        $typeLetter->update($request->validated());

        flashMessage('Success', 'Berhasil memperbarui jenis surat');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($typeLetter)
    {
        // dd($typeLetter);
        if (!$typeLetter) {
            return back()->withErrors([
                'errors' => 'Jenis surat tidak ditemukan'
            ]);
        }

        $typeLetter = TypeLetter::find($typeLetter);
        $typeLetter->delete();

        flashMessage('Success', 'Berhasil menghapus jenis surat');

        return back();
    }
}
