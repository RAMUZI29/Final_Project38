<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'price_per_day',
        'seat',
        'category_id',
        'jenis_bbm',
        'transmisi',
        'created_at',
        'updated_at'
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class, 'id_car');
    }
}
