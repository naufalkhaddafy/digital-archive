<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RemovedDocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        \Carbon\Carbon::setLocale('id');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'status' => $this->status,
            'file' => asset(Storage::url($this->file)),
            'description' => $this->description,
            'deleted_at' => $this->deleted_at->format('d-m-Y'),
            'is_private' => $this->is_private,
            'removed_at' => $this->deleted_at
                ? round(now()->diffInDays($this->deleted_at->copy()->addDays(30))) . ' hari lagi'
                : null,
        ];
    }
}
