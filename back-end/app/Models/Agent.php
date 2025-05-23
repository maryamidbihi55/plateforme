<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class Agent extends Model {
    use HasApiTokens, HasFactory;
    protected $fillable = ['nom', 'prenom', 'email', 'telephone', 'specialite', 'id_agence', 'mot_de_passe', 'is_validated','is_refused '];

    public function agence() {
        return $this->belongsTo(Agence::class);
    }

    public function servicesDemandes() {
        return $this->hasMany(ServiceDemande::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
