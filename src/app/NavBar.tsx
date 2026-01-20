"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export function NavBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  console.log("NavBar render searchInput:", searchInput);

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl" data-cy="spotify-logo">
          Spotify
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          data-cy="search-input"
        />
        <Link
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className="btn btn-ghost text-xl"
          data-cy="search-button"
        >
          Search
        </Link>
        <Link href="/playlists" className="btn btn-ghost text-xl">
          Playlists
        </Link>
        <Link href="/liked-songs" className="btn btn-ghost text-xl">
          Liked Songs
        </Link>
      </div>
    </div>
  );
}