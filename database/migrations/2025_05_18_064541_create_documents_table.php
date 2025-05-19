<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_letter_id')->nullable()->constrained('type_letters')->onDelete('cascade')->cascadeOnUpdate();
            $table->foreignId('folder_id')->nullable()->constrained('folders')->onDelete('cascade')->cascadeOnUpdate();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->cascadeOnUpdate();
            $table->string('name');
            $table->string('code')->nullable()->unique();
            $table->string('description')->nullable();
            $table->string('file')->nullable();
            $table->string('status')->nullable();
            $table->dateTime('accepted_at')->nullable();
            $table->boolean('is_private')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
