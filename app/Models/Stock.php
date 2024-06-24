<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'quantity'];

    public function car()
    {
        return $this->belongsTo(Car::class, 'id_car');
    }
}
