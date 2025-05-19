<?php

namespace App\Http\Controllers;

use App\Http\Resources\LettersResource;
use App\Http\Resources\TypeLetterResource;
use App\Models\Document;
use App\Models\TypeLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mockery\Matcher\Type;
use PhpParser\Comment\Doc;

class LetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filters = $request->only(['keyword']);

        $typeLetters = TypeLetter::query()->with('documents')->when($filters['keyword'] ?? null, fn($q) => $q->whereAny(['name', 'is_private', 'slug', 'created_at', 'updated_at'], 'like', '%' . $filters['keyword'] . '%'))->get();
        $letters = Document::query()->with('typeLetter')->whereNotNull('type_letter_id')->when($filters['keyword'] ?? null, function ($q) use ($filters) {
            $keyword = $filters['keyword'];
            $q->whereAny(['name', 'code', 'status'], 'like', "%{$keyword}%")
                ->orWhereHas('typeLetter', function ($q2) use ($keyword) {
                    $q2->where('name', 'like', "%{$keyword}%");
                });
        })->latest()->get();

        return Inertia('Surat/Index', [
            'typeLetters' => TypeLetterResource::collection($typeLetters),
            'letters' => LettersResource::collection($letters),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function letterIn()
    {
        return inertia('Surat/Form', [
            'posts' => new Document(),
            'page_settings' => [
                'title' => 'Tambah Surat Masuk',
                'description' => 'Menambahkan Surat Masuk',
                'url' => route('dokumen.store'),
                'method' => 'POST',
                'type' => 'in',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }


    public function letterOut()
    {
        return inertia('Surat/Form', [
            'posts' => new Document(),
            'page_settings' => [
                'title' => 'Tambah Surat Keluar',
                'description' => 'Menambahkan Surat Keluar',
                'url' => route('dokumen.store'),
                'method' => 'POST',
                'type' => 'out',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }

    public function letterInEdit()
    {
        return inertia('Surat/Form', [
            'posts' => new Document(),
            'page_settings' => [
                'title' => 'Edit Surat Masuk',
                'description' => 'Mengubah data Surat Masuk',
                'url' => route('dokumen.store'),
                'method' => 'POST',
                'type' => 'in',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }

    public function letterOutEdit(Document $id)
    {
        return inertia('Surat/Form', [
            'posts' => new Document(),
            'page_settings' => [
                'title' => 'Tambah Surat Keluar',
                'description' => 'Menambahkan Surat Keluar',
                'url' => route('dokumen.store'),
                'method' => 'POST',
                'type' => 'out',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
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
