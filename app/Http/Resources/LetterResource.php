<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LetterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'status' => $this->status,
            'file' => asset(Storage::url($this->file)),
            'description' => $this->description,
            'type_letter_name' => $this->typeLetter->name,
            'type_letter_id' => $this->typeLetter->id,
            'accepted_at' => $this->accepted_at->format('Y-m-d'),
            'is_private' => $this->is_private,
            'url' => $this->status->value == 'masuk' ? route('edit.surat.masuk', $this->id) : route('edit.surat.keluar', $this->id),
        ];
    }
}
