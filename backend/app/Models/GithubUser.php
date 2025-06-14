<?php

namespace App\Models;

class GithubUser
{
    public string $name;
    public string $login;
    public string $bio;
    public int $followers;
    public int $following;
    public string $company;
    public string $location;
    public int $public_repos;
    public string $avatar_url;
    public string $html_url;
    public string $blog;

    public function __construct(array $data)
    {
        $this->name = $data['name'] ?? '';
        $this->login = $data['login'] ?? '';
        $this->bio = $data['bio'] ?? '';
        $this->followers = $data['followers'] ?? 0;
        $this->following = $data['following'] ?? 0;
        $this->company = $data['company'] ?? '';
        $this->location = $data['location'] ?? '';
        $this->public_repos = $data['public_repos'] ?? 0;
        $this->avatar_url = $data['avatar_url'] ?? '';
        $this->html_url = $data['html_url'] ?? '';
        $this->blog = $data['blog'] ?? '';
    }
}
