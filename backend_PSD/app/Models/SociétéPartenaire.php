<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocietePartenaire extends Model {
    use HasFactory;
    protected $fillable = ['nom_société', 'email', 'téléphone', 'adresse', 'id_catégorie', 'user_id'];

    public function categorie() {
        return $this->belongsTo(CategorieService::class);
    }

    public function agences() {
        return $this->hasMany(Agence::class);
    }

    public function servicesDemandes() {
        return $this->hasMany(ServiceDemande::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

}
