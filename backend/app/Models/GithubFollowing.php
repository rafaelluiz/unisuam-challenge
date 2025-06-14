<?php

namespace App\Models;

class GithubFollowing
{
    public string $login;
    public string $avatar_url;
    public string $html_url;

    public function __construct(array $data)
    {
        $this->login = $data['login'];
        $this->avatar_url = $data['avatar_url'];
        $this->html_url = $data['html_url'];
    }

    public function toArray(): array
    {
        return [
            'login' => $this->login,
            'avatar_url' => $this->avatar_url,
            'html_url' => $this->html_url,
        ];
    }
}
