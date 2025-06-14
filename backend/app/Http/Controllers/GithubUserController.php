<?php

namespace App\Http\Controllers;

use App\Services\ApiLogService;
use App\Services\GithubUserService;
use Illuminate\Http\Request;

class GithubUserController extends Controller
{
    protected GithubUserService $githubUserService;

    public function __construct(GithubUserService $githubUserService)
    {
        $this->githubUserService = $githubUserService;
    }

    public function show(string $username)
    {
        $user = $this->githubUserService->getUser($username);
        ApiLogService::log(
            method: 'GET',
            endpoint: "/api/github/users/{$username}",
            payload: ['username' => $username],
            statusCode: 200
        );
        return response()->json($user);
    }

    public function followings(string $username)
    {
        $followings = $this->githubUserService->getUserFollowing($username);
        ApiLogService::log(
            method: 'GET',
            endpoint: "/api/github/users/{$username}/following",
            payload: ['username' => $username],
            statusCode: 200
        );
        return response()->json($followings);
    }
}
