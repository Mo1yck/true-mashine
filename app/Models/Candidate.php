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

    // Связь: кандидат принадлежит запросу
    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    // Связь: у кандидата много навыков
    public function candidateSkills()
    {
        return $this->hasMany(CandidateSkill::class);
    }

    // Связь: кандидата загрузил пользователь
    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Связь: у кандидата много результатов сверки
    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}