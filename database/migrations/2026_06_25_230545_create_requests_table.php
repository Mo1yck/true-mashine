<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('position'); // PHP-разработчик
            $table->text('description')->nullable(); // описание проекта
            $table->string('grade')->nullable(); // junior, middle, senior, lead
            $table->string('location')->nullable(); // Москва, РФ
            $table->string('citizenship')->nullable(); // гражданство
            $table->date('release_date')->nullable(); // дата выхода
            $table->enum('status', ['draft', 'active', 'closed'])->default('draft');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
