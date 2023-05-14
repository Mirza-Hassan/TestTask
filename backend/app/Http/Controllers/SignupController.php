<?php

namespace App\Http\Controllers;

use App\Models\Signup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    // Handle signup form submission
    public function signup(Request $request)
    {
        // Validate the form data
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Create a new signup
        $signup = Signup::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create a response array
        $response = [
            'status' => 'success',
            'message' => 'Signup successfully',
            'data' => $signup,
        ];

    }

    public function fetch(Request $request) {
        // Retrieve articles from the database
        $signups = Signup::all();
        
        // Check if email parameter is provided
        if ($request->has('email')) {
            $email = $request->input('email');
            $signups->where('email', $email);
        }

        // Create a response array
        $response = [
            'status' => 'success',
            'message' => 'Users retrieved successfully',
            'data' => $signups,
        ];

        // Return the response as JSON
        return response()->json($response, 200);
    }
}




