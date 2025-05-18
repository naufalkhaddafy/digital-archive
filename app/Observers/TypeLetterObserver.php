<?php

namespace App\Observers;

use App\Models\TypeLetter;

class TypeLetterObserver
{
    public function creating(TypeLetter $type): void
    {
        $type->slug = str()->slug($type->name);
    }
}
