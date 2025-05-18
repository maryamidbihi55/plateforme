<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Client extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'nom',
        'prénom',
        'email',
        'téléphone',
        'adresse',
        'mot_de_passe'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    // Relations
    public function servicesDemandes()
    {
        return $this->hasMany(ServiceDemande::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }
}
