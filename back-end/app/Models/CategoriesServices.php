<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesServices extends Model {
    use HasFactory;
    protected $fillable = ['nom_categorie'];

    public function sociétés() {
        return $this->hasMany(SocietePartenaire::class);
    }
}
