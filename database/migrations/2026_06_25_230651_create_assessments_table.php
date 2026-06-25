<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained();
            $table->foreignId('candidate_id')->constrained();
            $table->float('must_have_score')->nullable(); // % по must have
            $table->float('nice_to_have_score')->nullable(); // % по nice to have
            $table->float('total_score')->nullable(); // общий %
            $table->json('matched_requirements')->nullable(); // закрытые требования
            $table->json('missing_requirements')->nullable(); // отсутствующие
            $table->boolean('is_fully_matched')->default(false); // все must закрыты?
            $table->text('notes')->nullable(); // комментарий
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
