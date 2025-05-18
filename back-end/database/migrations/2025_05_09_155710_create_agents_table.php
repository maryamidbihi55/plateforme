<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration {
    public function up() {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prénom');
            $table->string('email')->unique();
            $table->string('téléphone');
            $table->string('spécialité');
            $table->foreignId('id_agence')->constrained('agences');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('agents');
    }
};
