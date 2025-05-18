<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class SocietePartenaire extends Model
{
    use HasApiTokens, HasFactory;
    protected $table = 'societes_partenaires';
    protected $fillable = [
        'nom_société',
        'email',
        'téléphone',
        'adresse',
        'id_catégorie',
        'mot_de_passe',
    ];

    public function categorie()
    {
        return $this->belongsTo(CategorieService::class);
    }

    public function agences()
    {
        return $this->hasMany(Agence::class);
    }

    public function servicesDemandes()
    {
        return $this->hasMany(ServiceDemande::class);
    }
}
