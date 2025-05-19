<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 public function up()
    {
        Schema::table('services_demandes', function (Blueprint $table) {
            $table->unsignedBigInteger('id_agence')->nullable()->after('id'); // placer selon ton besoin
            $table->foreign('id_agence')->references('id')->on('agences');
        });
    }

    public function down()
    {
        Schema::table('services_demandes', function (Blueprint $table) {
            $table->dropForeign(['id_agence']);
            $table->dropColumn('id_agence');
        });
    }
};
