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

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function technology()
    {
        return $this->belongsTo(Technology::class);
    }
}