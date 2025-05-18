<?php

namespace App\Http\Controllers;

use App\Models\TypeLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mockery\Matcher\Type;

class LetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filters = $request->only(['keyword']);

        $typeLetters = TypeLetter::query()->when($filters['keyword'] ?? null, fn($q) => $q->whereAny(['name', 'is_private', 'slug', 'created_at', 'updated_at'], 'like', '%' . $filters['keyword'] . '%'))->select('id', 'name', 'is_private')->get();

        return Inertia('Surat/Index', [
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
