import { getDb } from "@/lib/db";
import Link from "next/link";
import { LikeSongButton } from "../album/[id]/LikeSongButton";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
}

export default async function LikedSongsPage() {
  const db = getDb();
  const userId = 1;

  const likedSongs = await db
    .selectFrom("liked_songs")
    .innerJoin("songs", "liked_songs.song_id", "songs.id")
    .innerJoin("albums", "songs.album_id", "albums.id")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "liked_songs.id",
      "liked_songs.song_id",
      "songs.name",
      "songs.duration",
      "songs.album_id",
      "albums.name as album_name",
      "authors.id as author_id",
      "authors.name as author_name",
    ])
    .where("liked_songs.user_id", "=", userId)
    .orderBy("liked_songs.created_at", "desc")
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <h1 className="text-4xl font-bold">Liked Songs</h1>

        {likedSongs.length === 0 ? (
          <p className="text-lg text-gray-500">
            No liked songs yet. Start liking songs from albums!
          </p>
        ) : (
          <div className="w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Author</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {likedSongs.map((song, i) => (
                  <tr key={song.id}>
                    <td>{i + 1}</td>
                    <td>{song.name}</td>
                    <td>
                      <Link href={`/album/${song.album_id}`}>
                        {song.album_name}
                      </Link>
                    </td>
                    <td>
                      <Link href={`/author/${song.author_id}`}>
                        {song.author_name}
                      </Link>
                    </td>
                    <td>{formatDuration(song.duration)}</td>
                    <td>
                      <LikeSongButton songId={song.song_id} isLiked={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
