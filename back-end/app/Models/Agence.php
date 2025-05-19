<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Agence extends Model {
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'nom_agence',
        'adresse',
        'téléphone',
        'id_société',
        'mot_de_passe',
        'email',
        'is_validated'
    ];

    public function societePartenaire() {
        return $this->belongsTo(SocietePartenaire::class, 'id_société');
    }

    public function agents() {
        return $this->hasMany(Agent::class, 'id_agence');
    }

    public function demandes() {
        return $this->hasMany(ServiceDemande::class, 'id_agence');
    }
}
