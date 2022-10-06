<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chirp extends Model
{
    protected $fillable = [
        'message',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
