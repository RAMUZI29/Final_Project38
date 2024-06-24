<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->string('status');
            $table->double('price');
            $table->string('item_name');
            $table->string('customer_first_name');
            $table->string('customer_email');
            $table->string('checkout_link');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['rental_id']);
        });
        Schema::dropIfExists('payments');
    }
}
