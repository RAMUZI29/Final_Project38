<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function index()
    {
        return response()->json([
            "status" => false,
            "message" => "harap login terlebih dahulu"
        ], 401);
    }

    /**
     * Login user and create token
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation failed. Please check your email and password."
            ], 401);
        }

        $credentials = $request->only('email', 'password');

        // Use dd($credentials) here to inspect data being sent

        if (!$token = auth('api')->attempt($credentials)) {
            // Use dd here to see any error messages

            return response()->json([
                "status" => false,
                "message" => "Login failed." // More specific message might be helpful
            ], 401);
        }

        return response()->json([
            "status" => true,
            "message" => "Login successful",
            "token" => $token
        ], 200);
    }


    public function register(Request $request)
    {
        $valdator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        // failed validation
        if ($valdator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $valdator->errors()
            ], 401);
        }

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        // success login
        if ($user) {
            return response()->json([
                "status" => true,
                "message" => "register success",
                "data" => $user
            ], 200);
        }

        // failed
        return response()->json([
            "status" => false,
            "message" => "register failed"
        ], 401);
    }

    public function loginWithGoogle(Request $request)
    {
        $accessToken = $request->bearerToken();
        try {
            $response = Http::withHeaders(
                ['Authorization' => 'Bearer ' . $accessToken]
            )->get('https://www.googleapis.com/oauth2/v3/userinfo');

            $userdata = $response->json();

            $email = $request->email;
            $name = $request->name;
            $password = bcrypt($request->password);

            $user = User::where('email', $email)->first();

            if ($user) {
                $token = auth()->guard('api')->login($user);
                return response()->json([
                    "status" => true,
                    "message" => "login success with google",
                    "token" => $token
                ], 200);
            } else {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => $password
                ]);
                $token = auth()->guard('api')->login($user);
                return response()->json([
                    "status" => true,
                    "message" => "register with google success",
                    "token" => $token
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ], 401);
        }
    }
    public function logout(Request $request)
    {
        //remove token
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());

        if ($removeToken) {
            //return response JSON
            return response()->json([
                'success' => true,
                'message' => 'Logout Berhasil!',
            ]);
        }
    }

    public function info(Request $request)
    {
        $user = JWTAuth::user();
        return response()->json([
            "status" => true,
            "data" => $user
        ], 200);
    }
}
