<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgencesTable extends Migration {
    public function up() {
        Schema::create('agences', function (Blueprint $table) {
            $table->id();
            $table->string('nom_agence');
            $table->text('adresse');
            $table->string('téléphone');
            $table->foreignId('id_société')->constrained('societes_partenaires');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('agences');
    }
};
