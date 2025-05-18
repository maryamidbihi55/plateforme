<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesServicesTable extends Migration {
    public function up() {
        Schema::create('categories_services', function (Blueprint $table) {
            $table->id();
            $table->string('nom_catégorie')->unique();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('categories_services');
    }
};
