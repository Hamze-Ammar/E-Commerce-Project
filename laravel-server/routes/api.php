<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;



Route::group(['prefix' => 'v1'], function(){
    Route::group(['prefix' => 'user'], function(){
        Route::group(['middleware' => 'api'], function($router) {
            Route::post('/register', [JWTController::class, 'register']);
            Route::post('/login', [JWTController::class, 'login']);
            Route::post('/logout', [JWTController::class, 'logout']);
            Route::post('/refresh', [JWTController::class, 'refresh']);
            Route::post('/profile', [JWTController::class, 'profile']);
        });
        // add to favourite item
        Route::group(['middleware' => 'fav'], function() {
            Route::post('/add_favourite', [UserController::class, 'addFavourite']);
        }); 
    });


    Route::group(['prefix' => 'admin'], function(){
        Route::group(['middleware' => 'api'], function($router) {
            Route::post('/login_admin', [JWTController::class, 'loginAdmin']);
        });
        Route::group(['middleware' => 'admin'], function(){
            Route::post('/add_category', [AdminController::class, 'addCategory'])->name("add_category");
            Route::post('/add_item', [AdminController::class, 'addItem'])->name("add_item");
            Route::get('/get_categories', [AdminController::class, 'getCategories'])->name("get_categories");
        });
    });

    Route::get('/main', [MainController::class, 'displayItems'])->name("displayItems");
    Route::get('/get_all_categories', [MainController::class, 'getAllCategories'])->name("get_all_categories");
    Route::get('/get_items_by_cat_id', [MainController::class, 'getItemsByCatId'])->name("get_items_by_cat_id");
    Route::get('/not_found', [MainController::class, 'notFound'])->name("not-found");
});

