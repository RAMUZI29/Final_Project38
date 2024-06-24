<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StocksCarSeeder extends Seeder
{
    public function run()
    {

        DB::table('stocks')->insert([
            ['id_car' => 1, 'quantity' => 2],
            ['id_car' => 2, 'quantity' => 1],
            ['id_car' => 3, 'quantity' => 3],
            ['id_car' => 4, 'quantity' => 3],
            ['id_car' => 5, 'quantity' => 3],
            ['id_car' => 6, 'quantity' => 3],
            ['id_car' => 7, 'quantity' => 2],
            ['id_car' => 8, 'quantity' => 3],
            ['id_car' => 9, 'quantity' => 1],
            ['id_car' => 10, 'quantity' => 3],
            ['id_car' => 11, 'quantity' => 2],
            ['id_car' => 12, 'quantity' => 1],
            ['id_car' => 13, 'quantity' => 3],
            ['id_car' => 14, 'quantity' => 1],
            ['id_car' => 15, 'quantity' => 3],
            ['id_car' => 16, 'quantity' => 3],
            ['id_car' => 17, 'quantity' => 3],
            ['id_car' => 18, 'quantity' => 3],
        ]);
    }
}
