<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agents', function (Blueprint $table) {
            // Pour pouvoir modifier une colonne existante, assure-toi que doctrine/dbal est installé
            $table->boolean('is_validated')->default(0)->nullable(false)->change();
            $table->boolean('is_refused')->default(0)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('agents', function (Blueprint $table) {
            // On annule les valeurs par défaut (remet à null si besoin)
            $table->boolean('is_validated')->nullable()->default(null)->change();
            $table->boolean('is_refused')->nullable()->default(null)->change();
        });
    }
};
