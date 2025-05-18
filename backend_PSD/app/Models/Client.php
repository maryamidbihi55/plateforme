<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model {
    use HasFactory;
    protected $fillable = ['nom', 'prénom', 'email', 'téléphone', 'adresse', 'mot_de_passe', 'user_id'];

    public function servicesDemandes() {
        return $this->hasMany(ServiceDemande::class);
    }

    public function paiements() {
        return $this->hasMany(Paiement::class);
    }

    public function avis() {
        return $this->hasMany(Avis::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

}
