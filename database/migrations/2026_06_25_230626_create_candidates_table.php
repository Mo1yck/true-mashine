<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->nullable()->constrained();
            $table->string('name')->nullable(); // ФИО или метка
            $table->string('file_path'); // путь к файлу
            $table->text('extracted_text')->nullable(); // распознанный текст
            $table->json('skills')->nullable(); // ['PHP', 'Laravel', 'Docker']
            $table->json('parsed_data')->nullable(); // грейд, локация, опыт
            $table->float('match_score')->nullable(); // процент покрытия
            $table->enum('status', ['uploaded', 'processed', 'matched', 'rejected'])->default('uploaded');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};