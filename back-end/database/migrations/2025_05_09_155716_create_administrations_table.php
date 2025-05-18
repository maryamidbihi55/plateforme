<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdministrationsTable extends Migration {
    public function up() {
        Schema::create('Administration', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prénom');
            $table->string('email')->unique();
            $table->string('mot_de_passe');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('Administration');
    }
}
