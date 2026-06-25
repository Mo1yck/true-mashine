<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // PHP, Laravel, Docker
            $table->string('group')->nullable(); // языки, фреймворки, базы данных
            $table->json('synonyms')->nullable(); // ['php', 'php7', 'php8']
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technologies');
    }
};
