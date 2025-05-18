<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesDemandesTable extends Migration {
    public function up() {
        Schema::create('services_demandes', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->date('date_souhaitée');
            $table->text('adresse_intervention');
            $table->foreignId('id_client')->constrained('clients');
            $table->foreignId('id_société')->constrained('societes_partenaires');
            $table->foreignId('id_agent')->constrained('agents');
            $table->enum('statut', ['En attente', 'En cours', 'Terminé'])->default('En attente');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('services_demandes');
    }
};
