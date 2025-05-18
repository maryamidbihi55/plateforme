<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaiementsTable extends Migration {
    public function up() {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->decimal('montant', 10, 2);
            $table->date('date_paiement');
            $table->enum('statut', ['Effectué', 'En attente', 'Échoué'])->default('En attente');
            $table->string('mode_paiement');
            $table->foreignId('id_client')->constrained('clients');
            $table->foreignId('id_service')->constrained('services_demandes');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('paiements');
    }
};
