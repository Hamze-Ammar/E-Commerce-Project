<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\User;
use App\Models\Favourite;


class UserController extends Controller
{
    
    public function addFavourite(Request $request)
    {   
        $user = Auth::user();
        $user_id = $user->id;
        $favourite = new Favourite;
        $favourite->user_id = $user_id;
        $favourite->item_id = $request->item_id;
        $favourite->save();

        return response()->json([
            "status" => "Success"
        ], 200);
    }
}
