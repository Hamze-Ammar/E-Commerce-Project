<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Category;
use App\Models\Item;

class AdminController extends Controller
{
    public function addCategory(Request $request)
    {
        # code...
        $category = new Category;
        $category->name = $request->name;
        $category->save();

        return response()->json([
            "status" => "Success"
        ], 200);
    }

    public function addItem(Request $request)
    {
        # code...
        $item = new Item;
        $item->name = $request->name;
        $item->price = $request->price;
        $item->image = $request->image;
        $item->category_id = $request->category_id;
        $item->save();

        return response()->json([
            "status" => "Success"
        ], 200);
    }

    public function getCategories(){
        # code...
        $categories = Category::all();

        return response()->json([
            "status" => "Success",
            "response" => $categories
        ], 200);
    }
    
}
