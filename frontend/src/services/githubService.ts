// src/services/githubService.ts
import { apiFetch } from "./api";

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  blog?: string;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const url = `github/users/${encodeURIComponent(username)}`;
  return apiFetch<GitHubUser>(url);
}

export interface GitHubFollowing {
  login: string;
  avatar_url: string;
  html_url: string;
}

export async function fetchGitHubFollowing(
  username: string
): Promise<GitHubFollowing[]> {
  const url = `github/users/${encodeURIComponent(username)}/following`;
  return apiFetch<GitHubFollowing[]>(url);
}
