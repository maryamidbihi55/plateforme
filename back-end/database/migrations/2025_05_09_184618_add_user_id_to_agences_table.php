<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToAgencesTable extends Migration {
    public function up() {
        Schema::table('agences', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->after('id');
        });
    }

    public function down() {
        Schema::table('agences', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}
