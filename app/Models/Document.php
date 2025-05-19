<?php

namespace App\Models;

use App\Enums\LetterStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentFactory> */
    use HasFactory;

    protected $casts = [
        'status' => LetterStatus::class,
    ];

    public function typeLetter()
    {
        return $this->belongsTo(TypeLetter::class);
    }
    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
