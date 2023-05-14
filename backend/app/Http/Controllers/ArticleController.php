<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    public function articles(Request $request) {
            // Retrieve articles from the database
            $articles = Article::all();

            // Create a response array
            $response = [
                'status' => 'success',
                'message' => 'Articles retrieved successfully',
                'data' => $articles,
            ];
    
            // Return the response as JSON
            return response()->json($response, 200);
        }
    }