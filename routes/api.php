<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RentalController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\PaymentController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'apikey', 'prefix' => ''],
    function () {
        Route::get("/userlist", function () {
            $user = User::all();
            return response()->json([
                "status" => true,
                "data" => $user
            ], 200);
        })->middleware('auth:api', 'admin');

        Route::get('login', [AuthController::class, 'index'])->name('login');
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::get('logout', [AuthController::class, 'logout'])->middleware('auth:api');

        // Get Info User Login
        Route::get('info', [AuthController::class, 'info'])->middleware('auth:api');



        // register with google
        Route::get("oauth/register", [AuthController::class, 'loginWithGoogle']);

        //Routes protected by sanctum auth middleware

        Route::middleware('auth:api')->group(function () {
            Route::get('products', [ProductController::class, 'index']);

            Route::post('products', [ProductController::class, 'store']);
            Route::put('products/{id}', [ProductController::class, 'update']);
            Route::delete('products/{id}', [ProductController::class, 'destroy']);

            Route::get('car', [CarController::class, 'index']);
            Route::post('car', [CarController::class, 'store']);
            Route::put('car/{id}', [CarController::class, 'update']);
            Route::delete('car/{id}', [CarController::class, 'destroy']);

            Route::get('rental', [RentalController::class, 'index']);
            Route::post('rental', [RentalController::class, 'store']);
            Route::put('rental/{id}', [RentalController::class, 'update']);
            Route::delete('rental/{id}', [RentalController::class, 'destroy']);

            Route::get('stock', [StockController::class, 'index']);
            Route::post('stock', [StockController::class, 'store']);
            Route::put('stock/{id}', [StockController::class, 'update']);
            Route::delete('stock/{id}', [StockController::class, 'destroy']);

            Route::get('payment', [PaymentController::class, 'index']);
            Route::post('payment', [PaymentController::class, 'store']);
            Route::put('payment/{id}', [PaymentController::class, 'update']);
            Route::delete('payment/{id}', [PaymentController::class, 'destroy']);

            Route::get('categories', [CategoryController::class, 'index']);
            //Admin routes
            Route::middleware('admin')->group(function () {
                Route::post('categories', [CategoryController::class, 'store']);
                Route::put('categories/{id}', [CategoryController::class, 'update']);
                Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
            });
        });
    }
);



