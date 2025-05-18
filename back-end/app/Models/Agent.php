<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model {
    use HasFactory;
    protected $fillable = ['nom', 'prénom', 'email', 'téléphone', 'spécialité', 'id_agence', 'user_id'];

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
