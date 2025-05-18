<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administration extends Model {
    use HasFactory;
    protected $fillable = ['nom', 'prénom', 'email', 'mot_de_passe', 'user_id'];
    public function scopeSuperAdmins($query) {
        return $query->where('role', 'super_admin');
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
