<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidate_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->onDelete('cascade');
            $table->foreignId('technology_id')->constrained();
            $table->text('source_context')->nullable(); // фрагмент текста из резюме
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidate_skills');
    }
};