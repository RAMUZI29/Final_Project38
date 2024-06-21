<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        // Mengambil semua data stock
        $stocks = Stock::all();
        return response()->json([
            "status" => true,
            "message" => "Stocks retrieved successfully",
            "data" => $stocks
        ], 200);
    }

    public function show($id)
    {
        // Mengambil data stock berdasarkan ID
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json([
                "status" => false,
                "message" => "Stock not found"
            ], 404);
        }
        return response()->json([
            "status" => true,
            "message" => "Stock details",
            "data" => $stock
        ], 200);
    }

    public function store(Request $request)
    {
        // Validasi data
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'quantity' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()
            ], 422);
        }
        $stock = Stock::create($request->all());
        return response()->json([
            "status" => true,
            "message" => "Stock created successfully",
            "data" => $stock
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json([
                "status" => false,
                "message" => "Stock not found"
            ], 404);
        }
        $stock->update($request->all());
        return response()->json([
            "status" => true,
            "message" => "Stock updated successfully",
            "data" => $stock
        ], 200);
    }

    public function destroy($id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json([
                "status" => false,
                "message" => "Stock not found"
            ], 404);
        }
        $stock->delete();
        return response()->json([
            "status" => true,
            "message" => "Stock deleted successfully"
        ], 200);
    }
}
