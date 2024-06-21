<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'car_id',
        'name',
        'price',
        'image',
        'expired_at',
        'modified_by',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
