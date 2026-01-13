import { createPlaylist } from "@/actions/playlists";
import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function PlaylistsPage() {
  const db = getDb();

  const playlists = await db
    .selectFrom("playlists")
    .selectAll()
    .where("user_id", "=", 1)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Playlists</p>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Create 💁🏿👀</div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
            <div className="card-body">
              <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <p className="text-2xl font-bold">Create Playlist</p>
                <form action={createPlaylist}>
                  <input className="input" type="text" name="playlistName" />
                  <input className="btn" type="submit" value="Create" />
                </form>
              </main>
            </div>
          </div>
        </div>


        {/* <Link className="btn" href="/playlists/new">
          Create Playlist
        </Link> */}
        <ul>
          {playlists.map((playlist) => (
            <li className="list-disc" key={playlist.id}>
              <Link href={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
