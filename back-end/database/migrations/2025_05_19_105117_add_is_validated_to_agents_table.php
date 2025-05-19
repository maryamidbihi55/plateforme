<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('agents', function (Blueprint $table) {
            $table->boolean('is_validated')->default(false)->after('id_agence');
        });
    }
   public function down()
    {
        Schema::table('agents', function (Blueprint $table) {
            $table->dropColumn('is_validated');
        });
    }
};
