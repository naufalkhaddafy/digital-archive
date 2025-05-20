<?php

namespace App\Http\Controllers;

use App\Http\Requests\LetterRequest;
use App\Http\Resources\LetterResource;
use App\Http\Resources\LettersResource;
use App\Http\Resources\TypeLetterResource;
use App\Models\Document;
use App\Models\TypeLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
                'url' => route('surat.store'),
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
                'url' => route('surat.store'),
                'method' => 'POST',
                'type' => 'out',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }

    public function letterInEdit(Document $letter)
    {
        return inertia('Surat/Form', [
            'letter' => LetterResource::make($letter),
            'page_settings' => [
                'title' => 'Edit Surat Masuk',
                'description' => 'Mengubah data Surat Masuk',
                'url' => route('surat.update', $letter->id),
                'method' => 'PATCH',
                'type' => 'in',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }

    public function letterOutEdit(Document $letter)
    {
        return inertia('Surat/Form', [
            'letter' => LetterResource::make($letter),
            'page_settings' => [
                'title' => 'Edit Surat Keluar',
                'description' => 'Mengubah Surat Keluar',
                'url' => route('surat.update', $letter->id),
                'method' => 'PATCH',
                'type' => 'out',
            ],
            'type_letters' => TypeLetter::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LetterRequest $request)
    {

        $request->user()->documents()->create(
            [
                'type_letter_id' => $request->type_letter_id,
                'name' => $request->name,
                'code' => $request->code,
                'description' => $request->description,
                'file' => $request->file('file')->store('dokumen', 'public'),
                'status' => $request->status,
                'accepted_at' => $request->accepted_at,
                'is_private' => $request->is_private,
            ]
        );

        flashMessage('Success', 'Berhasil menambahkan Dokumen');
        return redirect()->route('daftar-surat');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypeLetter $type)
    {
        return inertia('Surat/Detail', [
            'letters' => LettersResource::collection($type->documents),
            'typeLetter' => TypeLetterResource::make($type),
        ]);
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
    public function update(LetterRequest $request, Document $letter)
    {
        if ($request->file('file') && Storage::disk('public')->exists($letter->file)) {
            Storage::disk('public')->delete($letter->file);
        }

        $letter->update(
            [
                'type_letter_id' => $request->type_letter_id,
                'name' => $request->name,
                'code' => $request->code,
                'description' => $request->description,
                'file' => $request->file('file') ? $request->file('file')->store('dokumen', 'public') : $letter->file,
                'status' => $request->status,
                'accepted_at' => $request->accepted_at,
                'is_private' => $request->is_private,
            ]
        );

        flashMessage('Success', 'Berhasil mengubah Dokumen');
        return redirect()->route('daftar-surat');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $letter)
    {
        if (!empty($letter->file) && Storage::disk('public')->exists($letter->file)) {
            Storage::disk('public')->delete($letter->file);
        }

        $letter->delete();

        flashMessage('Success', 'Berhasil menghapus Dokumen');
        return redirect()->route('daftar-surat');
    }
}
