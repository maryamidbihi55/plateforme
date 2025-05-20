<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('agences', function (Blueprint $table) {
            // Ajout de la colonne
            $table->unsignedBigInteger('id_categorie_service')->after('id_société');

            // Déclaration de la contrainte de clé étrangère
            $table->foreign('id_categorie_service')
                  ->references('id')
                  ->on('categories_services')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agences', function (Blueprint $table) {
            // Suppression de la contrainte puis de la colonne
            $table->dropForeign(['id_categorie_service']);
            $table->dropColumn('id_categorie_service');
        });
    }
};
