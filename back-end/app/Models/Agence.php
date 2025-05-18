<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agence extends Model {
    use HasFactory;
    protected $fillable = ['nom_agence', 'adresse', 'téléphone', 'id_société', 'user_id'];

    public function société() {
        return $this->belongsTo(SocietePartenaire::class);
    }

    public function agents() {
        return $this->hasMany(Agent::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

}
