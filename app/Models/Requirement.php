<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    protected $fillable = [
        'request_id',
        'technology_id',
        'custom_text',
        'type',
        'weight',
    ];

    // Связь: требование принадлежит запросу
    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    // Связь: требование привязано к технологии
    public function technology()
    {
        return $this->belongsTo(Technology::class);
    }
}