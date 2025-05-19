<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeIdAgentNullableInServicesDemandesTable extends Migration
{
    public function up()
    {
        Schema::table('services_demandes', function (Blueprint $table) {
            $table->unsignedBigInteger('id_agent')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('services_demandes', function (Blueprint $table) {
            $table->unsignedBigInteger('id_agent')->nullable(false)->change();
        });
    }
}
