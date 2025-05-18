<?php

namespace App\Models;

use App\Observers\TypeLetterObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[ObservedBy(TypeLetterObserver::class)]

class TypeLetter extends Model
{
    /** @use HasFactory<\Database\Factories\TypeLetterFactory> */
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
