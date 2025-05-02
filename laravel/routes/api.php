<?php

use App\Http\Controllers\users\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('users')->group(function () {
    // Route to login a user
    Route::post('login', [UserController::class, 'login']);
    // Route to get all users
    Route::get('/', [UserController::class, 'index']);
    // Route to get a single user
    Route::get('/{id}', [UserController::class, 'show']);
    // Route to create a new user
    Route::post('/', [UserController::class, 'store']);
    // Route to update a user
    Route::put('/{id}', [UserController::class, 'update']);
    // Route to delete a user
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
