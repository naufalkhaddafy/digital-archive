<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentsResource;
use App\Http\Resources\LettersResource;
use App\Http\Resources\TypeLetterResource;
use App\Models\TypeLetter;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['keyword']);

        $letters = Document::query()->with('typeLetter')->whereNull('type_letter_id')->when($filters['keyword'] ?? null, function ($q) use ($filters) {
            $keyword = $filters['keyword'];
            $q->whereAny(['name', 'code', 'status'], 'like', "%{$keyword}%")
                ->orWhereHas('typeLetter', function ($q2) use ($keyword) {
                    $q2->where('name', 'like', "%{$keyword}%");
                });
        })->latest()->get();

        return Inertia('Document/Index', [
            'letters' => DocumentsResource::collection($letters),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Document/Form', [
            'document' => new Document(),
            'page_settings' => [
                'title' => 'Tambah  Dokumen',
                'description' => 'Menambahkan Dokumen Arsip ke sistem',
                'url' => route('dokumen.store'),
                'method' => 'POST',
                'type' => 'out',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $request->user()->documents()->create(
            [
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
        return redirect()->route('dokumen.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        // dd($document);
        return Inertia('Document/Form', [
            'document' => DocumentsResource::make($document),
            'page_settings' => [
                'title' => 'Edit Dokumen',
                'description' => 'Mengubah Dokumen Arsip ',
                'url' => route('dokumen.update', $document->id),
                'method' => 'PATCH',
                'type' => 'out',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDocumentRequest $request, Document $document)
    {
        if ($request->file('file') && Storage::disk('public')->exists($document->file)) {
            Storage::disk('public')->delete($document->file);
        }

        $document->update(
            [
                'name' => $request->name,
                'code' => $request->code,
                'description' => $request->description,
                'file' => $request->file('file') ? $request->file('file')->store('dokumen', 'public') : $document->file,
                'status' => $request->status,
                'accepted_at' => $request->accepted_at,
                'is_private' => $request->is_private,
            ]
        );

        flashMessage('Success', 'Berhasil mengubah Dokumen');
        return redirect()->route('dokumen.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        if (!empty($document->file) && Storage::disk('public')->exists($document->file)) {
            Storage::disk('public')->delete($document->file);
        }

        $document->delete();

        flashMessage('Success', 'Berhasil menghapus Dokumen');
        return redirect()->route('dokumen.index');
    }
}
