<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use App\Models\Stock;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RentalController extends Controller
{
    // Fungsi untuk menampilkan semua rental
    public function index()
    {
        $rentals = Rental::with(['user', 'car'])->get();
        return response()->json([
            "status" => true,
            "message" => "Data rental list",
            "data" => $rentals
        ], 200);
    }

    // Fungsi untuk menampilkan detail rental berdasarkan ID
    public function show($id)
    {
        $rental = Rental::with(['user', 'car'])->find($id);
        if (!$rental) {
            return response()->json([
                "status" => false,
                "message" => "Rental not found"
            ], 404);
        }
        return response()->json([
            "status" => true,
            "message" => "Rental details",
            "data" => $rental
        ], 200);    
    }

    // Fungsi untuk membuat rental baru
    public function store(Request $request)
    {
        // Validasi data
        $validator = Validator::make($request->all(), [
            // 'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after_or_equal:start_date',
            'total_amount' => 'required|numeric',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()
            ], 422);
        }

        $rental_date = $request->rental_date;
        $return_date = $request->return_date;

        // if(){
        //     return response()->json([
        //         "status" => false,
        //         "message" => "Rental date and return date cannot be the same day"
        //     ]);
        // }

        $amount = $request->total_amount;
        $hari = DateTime::createFromFormat('Y-m-d', $return_date)->diff(DateTime::createFromFormat('Y-m-d', $rental_date))->days;
        $total = $amount * $hari;

        if($rental_date >= $return_date){
            return response()->json([
                "status" => false,
                "message" => "Rental date cannot be greater than return date"
            ]);
        }

        $addRental = [
            'user_id' => auth()->user()->id,
            'car_id' => $request->car_id,
            'rental_date' => $request->rental_date,
            'return_date' => $request->return_date,
            'total_amount' => $total,
            'status' => $request->status
        ];
       

        // Buat rental baru
        // cek stok 
        $stok = Stock::find($request->car_id);
        if ($stok->quantity <= 0) {
            return response()->json([
                "status" => false,
                "message" => "Stock not available"
            ]);
        }

        $stok->update([
            'quantity' => $stok->quantity - 1
        ]);

        $rental = Rental::create($addRental);
        
        // if ($rental) {
        //     $stok = Stock::find($request->car_id);
        //     $stok->update([
        //         'quantity' => $stok->quantity - 1
        //     ]);
        // }

        return response()->json([
            "status" => true,
            "message" => "Rental created",
            "data" => $rental
        ], 201);
    }

    // Fungsi untuk memperbarui rental berdasarkan ID
    public function update(Request $request, $id)
    {
        $rental = Rental::find($id);
        if (!$rental) {
            return response()->json([
                "status" => false,
                "message" => "Rental not found"
            ], 404);
        }

        // Validasi data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after_or_equal:start_date',
            'total_amount' => 'required|numeric',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // Perbarui data rental
        $rental->update($request->all());

        return response()->json([
            "status" => true,
            "message" => "Rental updated",
            "data" => $rental
        ], 200);
    }

    // Fungsi untuk menghapus rental berdasarkan ID
    public function destroy($id)
    {
        $rental = Rental::find($id);
        if (!$rental) {
            return response()->json([
                "status" => false,
                "message" => "Rental not found"
            ], 404);
        }

        $rental->delete();
        return response()->json([
            "status" => true,
            "message" => "Rental deleted"
        ], 200);
    }
}
