<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Administration extends Model {
    use HasApiTokens, HasFactory;
    protected $fillable = ['nom', 'prénom', 'email', 'mot_de_passe'];
    protected $hidden = [
        'mot_de_passe',
    ];
    protected $table = 'administration';
}
