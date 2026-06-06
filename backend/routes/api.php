<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return response(['Laravel' => '13.4.2']) ;
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
