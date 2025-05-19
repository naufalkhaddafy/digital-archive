<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreDocumentRequest $request)
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
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        //
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
        return redirect()->route('daftar-surat');
    }
}
