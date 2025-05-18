<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceDemande extends Model {
    use HasFactory;
    protected $fillable = ['description', 'date_souhaitée', 'adresse_intervention', 'id_client', 'id_société', 'id_agent', 'statut'];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function société() {
        return $this->belongsTo(SocietePartenaire::class);
    }

    public function agent() {
        return $this->belongsTo(Agent::class);
    }
}
