<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cars')->insert([
            ['name' => 'Palisade ', 'image' => '../public/uploads/img/hyundai/palisade.png', 'price_per_day' => 100000, 'category_id' => 1, 'jenis_bbm' => 'Diesel', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Ionic 6 ', 'image' => '../public/uploads/img/hyundai/ioniq6.png', 'price_per_day' => 900000, 'category_id' => 1, 'jenis_bbm' => 'EV', 'transmisi' => 'manual', 'seat' => 4],
            ['name' => 'Staria', 'image' => '../public/uploads/img/hyundai/staria.png','price_per_day' => 800000, 'category_id' => 1, 'jenis_bbm' => 'Diesel', 'transmisi' => 'manual', 'seat' => 7],
            ['name' => 'Creta', 'image' => '../public/uploads/img/hyundai/creta.png','price_per_day' => 100000, 'category_id' => 1, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Santa Fe', 'image' => '../public/uploads/img/hyundai/santa-fe.png','price_per_day' => 20000, 'category_id' => 1, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 7],
            ['name' => 'Stargazer', 'image' => '../public/uploads/img/hyundai/stargazer.png','price_per_day' => 900000, 'category_id' => 1, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 7],
            ['name' => 'Camry', 'image' => '../public/uploads/img/toyota/camry.png','price_per_day' => 200000, 'category_id' => 2, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Land Cruiser', 'image' => '../public/uploads/img/toyota/land-cruiser.png','price_per_day' => 300000, 'category_id' => 2, 'jenis_bbm' => 'Diesel', 'transmisi' => 'manual', 'seat' => 8],
            ['name' => 'Alphard', 'image' => '../public/uploads/img/toyota/alphard.png','price_per_day' => 400000, 'category_id' => 2, 'jenis_bbm' => 'Bensin', 'transmisi' => 'AT', 'seat' => 8],
            ['name' => 'Veloz', 'image' => '../public/uploads/img/toyota/veloz.png','price_per_day' => 10000, 'category_id' => 2, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Fortuner', 'image' => '../public/uploads/img/toyota/fortuner.png','price_per_day' => 200000, 'category_id' => 2, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Innova V', 'image' => '../public/uploads/img/toyota/venturer.png','price_per_day' => 400000, 'category_id' => 2, 'jenis_bbm' => 'Diesel', 'transmisi' => 'AT', 'seat' => 7],
            ['name' => 'HRV', 'image' => '../public/uploads/img/honda/hrv.png','price_per_day' => 300000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
            ['name' => 'Civic', 'image' => '../public/uploads/img/honda/civic.png','price_per_day' => 200000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'AT', 'seat' => 5],
            ['name' => 'BR-V', 'image' => '../public/uploads/img/honda/brv.png','price_per_day' => 300000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 7],
            ['name' => 'CR-V', 'image' => '../public/uploads/img/honda/crv.png','price_per_day' => 300000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'automatic', 'seat' => 5],
            ['name' => 'Mobilio', 'image' => '../public/uploads/img/honda/mobilio.png','price_per_day' => 100000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 7],
            ['name' => 'WR-V', 'image' => '../public/uploads/img/honda/wrv.png','price_per_day' => 300000, 'category_id' => 3, 'jenis_bbm' => 'Bensin', 'transmisi' => 'manual', 'seat' => 5],
        ]);
    }
}
