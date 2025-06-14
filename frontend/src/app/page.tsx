"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Link } from "lucide-react";
import { UserDetails } from "@/components/user-details/UserDetails";
import { Avatar } from "@/components/avatar/Avatar";
import { FollowingCard } from "@/components/following-card/FollowingCard";
import Pagination from "@/components/pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import {
  fetchGitHubFollowing,
  fetchGitHubUser,
  GitHubFollowing,
  GitHubUser,
} from "@/services/githubService";
import { Followings } from "@/components/followings/Followings";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [followings, setFollowings] = useState<GitHubFollowing[] | []>([]);
  const [loadingFollowing, setLoadingFollowing] = useState<boolean>(false);
  const [searchFollowing, setSearchFollowing] = useState<string>("");

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setUser(null);
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchGitHubUser(value);
      setUser(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar usuário");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    debouncedSearch(value);
  };

  const getFollowings = async (username: string) => {
    setLoadingFollowing(true);
    try {
      const data = await fetchGitHubFollowing(username);
      setFollowings(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar os followings do usuário");
    } finally {
      setLoadingFollowing(false);
    }
  };

  useEffect(() => {
    setLoadingFollowing(true);
    if (user) {
      getFollowings(user.login);
    } else {
      setFollowings([]);
    }
    setLoadingFollowing(true);
  }, [user]);

  const filteredFollowings = useMemo(() => {
    if (!searchFollowing.trim()) return followings;

    return followings.filter((f) =>
      f.login.toLowerCase().includes(searchFollowing.toLowerCase())
    );
  }, [searchFollowing, followings]);

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <form className="flex flex-col mx-auto p-6 sm:p-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite o username do Github"
            />
          </div>
        </form>
      </div>

      {loading && <div className="flex justify-center mt-4">Carregando...</div>}

      {error && <div className="flex justify-center mt-4">{error}</div>}

      {user && (
        <>
          <div className="flex flex-col sm:flex-row w-full justify-center gap-8 mt-4">
            <div className="flex flex-col justify-center items-center">
              <Avatar url={user?.avatar_url} width="w-44" rounded />
              <div className="flex justify-center gap-4 mt-2">
                <a href={user.html_url} target="_blank" className="flex gap-1">
                  <Github size={16} className="mt-0.75" /> Github
                </a>

                {user.blog && (
                  <a href={user.blog} target="_blank" className="flex gap-1">
                    <Link size={16} className="mt-0.75" />
                    Site
                  </a>
                )}
              </div>
            </div>

            <div className="w-full sm:w-2/4 md:w-2/5 lg:w-1/4 m-auto sm:m-0">
              <UserDetails user={user} />
            </div>
          </div>

          {loadingFollowing && (
            <div className="flex justify-center mt-4">Carregando...</div>
          )}

          {filteredFollowings.length && (
            <div className="w-full mt-4">
              <Followings
                followings={filteredFollowings}
                searchFollowing={searchFollowing}
                setSearchFollowing={setSearchFollowing}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
