<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvisTable extends Migration {
    public function up() {
        Schema::create('avis', function (Blueprint $table) {
            $table->id();
            $table->text('commentaire');
            $table->date('date_avis');
            $table->foreignId('id_client')->constrained('clients');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('avis');
    }
};
