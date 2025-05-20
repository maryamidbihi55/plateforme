<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
{
    Schema::table('services_demandes', function (Blueprint $table) {
        $table->enum('etat_agence', ['acceptée', 'refusée', 'en attente'])->default('en attente');
    });
}

public function down()
{
    Schema::table('services_demandes', function (Blueprint $table) {
        $table->dropColumn('etat_agence');
    });
}

};
