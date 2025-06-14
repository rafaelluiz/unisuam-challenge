<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GithubUserController;

Route::get('/github/users/{username}', [GithubUserController::class, 'show']);
Route::get('/github/users/{username}/following', [GithubUserController::class, 'followings']);
