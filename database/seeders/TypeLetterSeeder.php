<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeLetterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'user_id' => 1,
                'name' => 'Surat Pengantar',
                'is_private' => false,
            ],
            [
                'user_id' => 1,
                'name' => 'Surat Kuasa',
                'is_private' => true,
            ],
            [
                'user_id' => 1,
                'name' => 'Surat Kewarisan',
                'is_private' => false,
            ],
            [
                'user_id' => 1,
                'name' => 'Surat Keterangan',
                'is_private' => false,
            ],
        ];

        collect($data)->each(function ($item) {
            \App\Models\TypeLetter::create($item);
        });
    }
}
