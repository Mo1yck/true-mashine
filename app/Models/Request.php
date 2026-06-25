<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $fillable = [
        'position',
        'description',
        'grade',
        'location',
        'citizenship',
        'release_date',
        'status',
        'created_by',
    ];

    // Связь: у запроса много требований
    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    // Связь: у запроса много кандидатов
    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }

    // Связь: запрос создал пользователь
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Связь: у запроса много результатов сверки
    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}