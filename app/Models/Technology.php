<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    protected $fillable = [
        'name',
        'group',
        'synonyms',
    ];

    protected $casts = [
        'synonyms' => 'array',
    ];

    // Связь: технология используется во многих требованиях
    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    // Связь: технология есть у многих кандидатов
    public function candidateSkills()
    {
        return $this->hasMany(CandidateSkill::class);
    }
}