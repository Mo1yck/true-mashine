<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateSkill extends Model
{
    protected $fillable = [
        'candidate_id',
        'technology_id',
        'source_context',
    ];

    // Связь: навык принадлежит кандидату
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    // Связь: навык привязан к технологии
    public function technology()
    {
        return $this->belongsTo(Technology::class);
    }
}