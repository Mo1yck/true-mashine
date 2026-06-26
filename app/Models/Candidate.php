<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $fillable = [
        'request_id',
        'name',
        'file_path',
        'extracted_text',
        'skills',
        'parsed_data',
        'match_score',
        'status',
        'uploaded_by',
    ];

    protected $casts = [
        'skills' => 'array',
        'parsed_data' => 'array',
    ];

    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    public function candidateSkills()
    {
        return $this->hasMany(CandidateSkill::class);
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }

    // ДОБАВЬ ЭТОТ МЕТОД:
    public function assessment()
    {
        return $this->hasOne(Assessment::class);
    }
}