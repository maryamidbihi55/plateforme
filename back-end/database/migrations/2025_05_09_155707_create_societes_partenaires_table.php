<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSocietesPartenairesTable extends Migration {
    public function up() {
        Schema::create('societes_partenaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom_société');
            $table->string('email')->unique();
            $table->string('téléphone');
            $table->text('adresse');
            $table->foreignId('id_catégorie')->constrained('categories_services');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('societes_partenaires');
    }
};
