<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->string('image')->nullable(false);
            $table->string('description')->nullable();
            $table->year('year')->nullable();
            $table->decimal('price_per_day', 10, 2)->nullable();
            $table->string('seat')->nullable();
            $table->enum('transmisi', ['manual', 'automatic', 'MT', 'AT'])->nullable();
            $table->string('jenis_bbm')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->timestamps();
        });

        // Menambahkan foreign key constraint
        Schema::table('cars', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
