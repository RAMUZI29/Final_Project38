<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'rental_date',
        'return_date',
        'total_amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->validateStatus();
        });

        static::updating(function ($model) {
            $model->validateStatus();
        });
    }

    public function validateStatus()
    {
        $validStatuses = ['Not Yet Paid', 'Active', 'Expired'];

        if (!in_array($this->status, $validStatuses)) {
            throw new \InvalidArgumentException("Invalid status: {$this->status}");
        }
    }
}
