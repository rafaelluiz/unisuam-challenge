<?php

namespace App\Services;

use App\Models\GithubFollowing;
use App\Models\GithubUser;
use Illuminate\Support\Facades\Http;

class GithubUserService
{
    /**
     * Busca usuário no GitHub pela API pública.
     *
     * @param string $username
     * @return GithubUser
     */
    public function getUser(string $username): GithubUser
    {
        $response = Http::get("https://api.github.com/users/{$username}");

        if ($response->failed()) {
            abort($response->status(), "Erro ao buscar usuário GitHub: {$username}");
        }

        return new GithubUser($response->json());
    }

    /**
     * Busca os followings do usuário do Github informado pela API pública
     *
     * @param string $username
     * @throws \Exception
     * @return array
     */
    public function getUserFollowing(string $username): array
    {
        $url = "https://api.github.com/users/{$username}/following?per_page=100";

        $response = Http::get($url);

        if ($response->failed()) {
            abort($response->status(), "Erro ao buscar usuários seguidos do GitHub: {$username}");
        }

        return collect($response->json())
        ->map(fn ($user) => new GithubFollowing($user))
        ->map(fn (GithubFollowing $f) => $f->toArray())
        ->toArray();
    }
}
