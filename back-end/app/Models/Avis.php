<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model {
    use HasFactory;
    protected $fillable = ['commentaire', 'date_avis', 'id_client'];

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
