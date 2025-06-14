"use client";

import { GitHubFollowing } from "@/services/githubService";
import { FollowingCard } from "../following-card/FollowingCard";
import Pagination from "../pagination/Pagination";
import { useState } from "react";

interface FollowingsProps {
  followings: GitHubFollowing[] | [];
  searchFollowing: string;
  setSearchFollowing: (searchFollowing: string) => void;
}

export const Followings = ({
  followings,
  searchFollowing,
  setSearchFollowing,
}: FollowingsProps) => {
  const [page, setPage] = useState<number>(1);

  return (
    <div className="flex flex-col justify-cente items-center">
      <div className="flex flex-col sm:flex-row justify-between px-6 w-full sm:w-1/2">
        <div className="text-2xl font-semibold">Followings</div>
        <div className="flex gap-2 w-full sm:w-64">
          <input
            type="text"
            value={searchFollowing}
            onChange={(e) => {
              setSearchFollowing(e.target.value);
            }}
            className="bg-gray-50 
                           border 
                           border-gray-300 
                           text-gray-900 
                           text-sm 
                           rounded-lg 
                           focus:ring-blue-500 
                           focus:border-blue-500 
                           h-8
                           w-full sm:w-xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex-wrap grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4 p-6">
        {followings.length
          ? followings.map((f: GitHubFollowing, i) => {
              const item = i + 1;
              if (page === 1) {
                if (item <= 10) {
                  return (
                    <FollowingCard
                      key={item}
                      name={f.login}
                      avatar={f.avatar_url}
                    />
                  );
                }
              } else {
                if (item > (page - 1) * 10 && item <= (page - 1) * 10 + 10) {
                  return (
                    <FollowingCard
                      key={item}
                      name={f.login}
                      avatar={f.avatar_url}
                    />
                  );
                }
              }
            })
          : null}
      </div>
      <div className="w-full sm:w-1/2 my-8">
        <Pagination
          currentPage={page}
          total={followings.length}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
