<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
    }
    public function payment(Request $request)
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = 'SB-Mid-server-vSlB2vmOHTOk_fO_LTND626z';
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;


        $params = array(
            'transaction_details' => array(
                'order_id' => Str::uuid(),
                'gross_amount' => $request->price,,
                // 'gross_amount' =>  rental_date + return_date * price,
            ),
            'customer_details' => array(
                'customer_first_name' =>$request->customer_first_name,
                'customer_email' => $request->customer_email,
            ),
            'item_details' => array(
                array(
                    'id' => 'a1',
                    'price' => 10000,
                    'quantity' => 1,
                    'name' => 'a1',
                ),
                array(
                    'id' => 'a2',
                    'price' => 9000,
                    'quantity' => 1,
                    'name' => 'a2',
                )
            )
        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        return response()->json(['token' => $snapToken]);
    }
    public function webhook(Request $request)
    {
        $auth = base64_encode(env('MIDRANTS_SERVER_KEY'));

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Basic $auth"
        ])->get("https://api.sandbox.midtrans.com/snap/v2/$request->id/status");

        $response = json_decode($response->body());

        $payments = Payment::where('order_id', $response->transaction_details->id)->firstOrFail();

        //check db
        if ($payments->status === 'settlement' || $payments->status === 'capture') {
            return response()->json('Payment success');
        }

        if ($response->transaction_status === 'capture') {
            $payments->status = 'settlement';
            //mengirim link ke customer
        } elseif ($response->transaction_status === 'settlement') {
            $payments->status = 'settlement';
            //mengirim link ke customer
        } elseif ($response->transaction_status === 'pending') {
            $payments->status = 'pending';
            //mengirim link ke customer
        } elseif ($response->transaction_status === 'deny') {
            $payments->status = 'deny';
            //mengirim link ke customer
        } elseif ($response->transaction_status === 'expire') {
            $payments->status = 'expire';
            //mengirim link ke customer
        } elseif ($response->transaction_status === 'cancel') {
            $payments->status = 'cancel';
            //mengirim link ke customer
        }

        $payments->save();
        return response()->json('Payment success');
    }

}
