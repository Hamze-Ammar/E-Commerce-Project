<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;

class MainController extends Controller
{
    public function displayItems()
    {
        # code...
        $items = Item::all();

        return response()->json([
            "status" => "Success",
            "items" => $items
        ], 200);
    }

    public function notFound(){
        return response()->json([
            "status" => "Failure",
            "message" => "Unauthorized"
        ], 404);
    }

    public function getAllCategories(){

        $categories = Category::all();

        return response()->json([
            "status" => "Success",
            "response" => $categories
        ], 200);
    }
    
    public function getItemsByCatId(Request $request)
    {
        # code...
        $id = $request->category_id;
        $items = Item::where("category_id", $id)->get();

        return response()->json([
            "status" => "Success",
            "items"=> $items
        ], 200);
    }
}
