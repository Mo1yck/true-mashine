<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'request_id',
        'candidate_id',
        'must_have_score',
        'nice_to_have_score',
        'total_score',
        'matched_requirements',
        'missing_requirements',
        'is_fully_matched',
        'notes',
    ];

    protected $casts = [
        'matched_requirements' => 'array',
        'missing_requirements' => 'array',
    ];

    // Связь: результат сверки принадлежит запросу
    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    // Связь: результат сверки принадлежит кандидату
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}