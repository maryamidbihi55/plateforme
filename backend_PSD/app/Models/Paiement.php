<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model {
    use HasFactory;
    protected $fillable = ['montant', 'date_paiement', 'statut', 'mode_paiement', 'id_client', 'id_service'];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function serviceDemande() {
        return $this->belongsTo(ServiceDemande::class);
    }
}
