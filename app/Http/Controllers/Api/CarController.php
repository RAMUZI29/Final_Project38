<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    // Fungsi untuk menampilkan semua mobil
    public function index()
    {
        $cars = Car::all();
        return response()->json([
            "status" => true,
            "message" => "Data car list",
            "data" => $cars
        ], 200);
    }

    // Fungsi untuk menampilkan detail mobil berdasarkan ID
    public function show($id)
    {
        $car = Car::find($id);
        if (!$car) {
            return response()->json([
                "status" => false,
                "message" => "Car not found"
            ], 404);
        }
        return response()->json([
            "status" => true,
            "message" => "Car details",
            "data" => $car
        ], 200);
    }

    // Fungsi untuk membuat mobil baru
    // Fungsi untuk membuat mobil baru
    public function store(Request $request)
    {
        // Validasi data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price_per_day' => 'required|string|max:255',
            'seat' => 'required|string|max:255',
            'transmisi' => 'required|in:manual,automatic,MT,AT', // Perubahan di sini
            "category_id" => 'required|exists:categories,id', // Perubahan di sini
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // Handle image upload if provided
        $image = null;
        if ($request->file('image')) {
            $hash_image = $request->file('image')->hashName();
            $request->file('image')->move(public_path('uploads/images/'), $hash_image);
            $image = "uploads/images/" . $hash_image;
        }

        // Buat mobil baru
        $car = Car::create([
            'name' => $request->name,
            'image' => $image,
            'description' => $request->description,
            'price_per_day' => $request->price_per_day,
            'seat' => $request->seat,
            'transmisi' => $request->transmisi,
            'category_id' => $request->category_id,
            'availability' => $request->quantity > 0 ? 'Tersedia' : 'Tidak Tersedia',
        ]);

        return response()->json([
            "status" => true,
            "message" => "Car created",
            "data" => $car
        ], 201);
    }

    // Fungsi untuk memperbarui mobil berdasarkan ID
    public function update(Request $request, $id)
    {
        $car = Car::find($id);
        if (!$car) {
            return response()->json([
                "status" => false,
                "message" => "Car not found"
            ], 404);
        }

        // Validasi data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Perubahan di sini
            'description' => 'required|string',
            'price_per_day' => 'required|string|max:255',
            'seat' => 'required|string|max:255',
            'transmisi' => 'required|in:manual,automatic,MT,AT', // Perubahan di sini
            "category_id" => 'required|exists:categories,id', // Perubahan di sini
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // Handle image upload if provided
        if ($request->hasFile('image')) { // Menggunakan hasFile() untuk memeriksa apakah file ada
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName(); // Menyimpan nama file yang asli
            $image->move(public_path('uploads/images/'), $imageName); // Menyimpan gambar dengan nama asli
            $car->image = "uploads/images/" . $imageName; // Menyimpan nama file di kolom 'image'
        }

        // Perbarui data mobil
        $car->update($request->only(['name', 'description', 'price_per_day', 'seat', 'transmisi', 'category_id', 'image']));

        // Perbarui ketersediaan berdasarkan stok
        $car->availability = $request->quantity > 0 ? 'Tersedia' : 'Tidak Tersedia';
        $car->save();

        return response()->json([
            "status" => true,
            "message" => "Car updated",
            "data" => $car
        ], 200);
    }

    // Fungsi untuk menghapus mobil berdasarkan ID
    public function destroy($id)
    {
        $car = Car::find($id);
        if (!$car) {
            return response()->json([
                "status" => false,
                "message" => "Car not found"
            ], 404);
        }

        $car->delete();
        return response()->json([
            "status" => true,
            "message" => "Car deleted"
        ], 200);
    }
}
