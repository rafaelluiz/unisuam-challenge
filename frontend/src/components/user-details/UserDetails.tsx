"use client";
import React, { useState } from "react";
import { MapPin, Building, Users, BookMarked } from "lucide-react";
import InfoModal from "../modals/InfoModal";
import { GitHubUser } from "@/services/githubService";

interface UserDetailsProps {
  user: GitHubUser | null;
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center p-6">
      <div className="text-4xl font-bold">{user?.name}</div>
      <div className="text-xl text-gray-400">{user?.login}</div>
      <div className="mt-2">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full w-full text-sm py-0.5 cursor-pointer me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setShowModal((state) => !state)}
        >
          Bio
        </button>
        {showModal && (
          <InfoModal
            title="Bio"
            isOpen={showModal}
            onClose={() => setShowModal((state) => !state)}
          >
            {user?.bio || "-"}
          </InfoModal>
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <Users size={16} className="mt-0.75" />
        <strong>{user?.followers}</strong>{" "}
        <span className="text-gray-500">followers</span> -{" "}
        <strong>{user?.following}</strong>{" "}
        <span className="text-gray-500">followings</span>
      </div>
      <div className="flex gap-2">
        <BookMarked size={16} className="mt-0.75" />
        <strong>{user?.public_repos}</strong>{" "}
        <span className="text-gray-500">repositórios públicos</span>
      </div>
      {user?.company && (
        <div className="mt-2 flex gap-2">
          <Building size={16} className="mt-0.75" />
          {user?.company}
        </div>
      )}
      {user?.location && (
        <div className="flex gap-2">
          <MapPin size={16} className="mt-0.75" />
          {user?.location}
        </div>
      )}
    </div>
  );
};
