<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceDemande extends Model {
    use HasFactory;

    protected $table = 'services_demandes';

    protected $fillable = [
        'description',
        'date_souhaitée',
        'adresse_intervention',
        'id_client',
        'id_agent',
        'id_agence',
        'statut',
        'etat_agence'
    ];

    public function client() {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function agence() {
        return $this->belongsTo(Agence::class, 'id_agence');
    }

    public function agent() {
        return $this->belongsTo(Agent::class, 'id_agent');
    }
}
