<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    var $apiInstance=null;
    
    // Fungsi untuk menampilkan semua pembayaran
//     public function index()
//     {
//         $payments = Payment::all();
//         return response()->json([
//             "status" => true,
//             "message" => "Data payment list",
//             "data" => $payments
//         ], 200);
//     }

//     // Fungsi untuk menampilkan detail pembayaran berdasarkan ID
//     public function show($id)
//     {
//         $payment = Payment::find($id);
//         if (!$payment) {
//             return response()->json([
//                 "status" => false,
//                 "message" => "Payment not found"
//             ], 404);
//         }
//         return response()->json([
//             "status" => true,
//             "message" => "Payment details",
//             "data" => $payment
//         ], 200);
//     }

//     // Fungsi untuk membuat pembayaran baru
//     public function store(Request $request)
//     {
//         // Validasi data
//         $validator = Validator::make($request->all(), [
//             'rental_id' => 'required|exists:rentals,id',
//             'amount' => 'required|numeric',
//             'payment_date' => 'required|date',
//             'status' => 'required'
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 "status" => false,
//                 "message" => $validator->errors()
//             ], 422);
//         }

//         // Buat pembayaran baru
//         $payment = Payment::create($request->all());

//         return response()->json([
//             "status" => true,
//             "message" => "Payment created",
//             "data" => $payment
//         ], 201);
//     }

//     // Fungsi untuk memperbarui pembayaran berdasarkan ID
//     public function update(Request $request, $id)
//     {
//         $payment = Payment::find($id);
//         if (!$payment) {
//             return response()->json([
//                 "status" => false,
//                 "message" => "Payment not found"
//             ], 404);
//         }

//         // Validasi data
//         $validator = Validator::make($request->all(), [
//             'rental_id' => 'required|exists:rentals,id',
//             'amount' => 'required|numeric',
//             'payment_date' => 'required|date',
//             'status' => 'required'
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 "status" => false,
//                 "message" => $validator->errors()
//             ], 422);
//         }

//         // Perbarui data pembayaran
//         $payment->update($request->all());

//         return response()->json([
//             "status" => true,
//             "message" => "Payment updated",
//             "data" => $payment
//         ], 200);
//     }

//     // Fungsi untuk menghapus pembayaran berdasarkan ID
//     public function destroy($id)
//     {
//         $payment = Payment::find($id);
//         if (!$payment) {
//             return response()->json([
//                 "status" => false,
//                 "message" => "Payment not found"
//             ], 404);
//         }

//         $payment->delete();
//         return response()->json([
//             "status" => true,
//             "message" => "Payment deleted"
//         ], 200);
//     }

}
