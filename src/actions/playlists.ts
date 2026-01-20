"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlaylist(formData: FormData) {
  const playlistName = formData.get("playlistName");

  if (playlistName == null) {
    throw new Error("Playlist name missing");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");
  }

  const db = getDb();

  const newPlaylist = await db
    .insertInto("playlists")
    .values({
      name: playlistNameStr,
      user_id: 1,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  redirect(`/playlist/${newPlaylist.id}`);
}

export async function updatePlaylist(formData: FormData) {
  const playlistName = formData.get("playlistName");

  if (playlistName == null) {
    throw new Error("Playlist name missing");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");
  }

  const playlistId = formData.get("playlistId");

  if (playlistId == null) {
    throw new Error("Playlist id missing");
  }

  const playlistIdInt = parseInt(playlistId.toString());

  if (isNaN(playlistIdInt)) {
    throw new Error("Invalid playlist id");
  }

  const db = getDb();

  await db.updateTable("playlists").set({ name: playlistNameStr }).where("id", "=", playlistIdInt).execute();

  revalidatePath(`/playlist/${playlistIdInt}`);
  // redirect(`/playlist/${playlistIdInt}`);
}

export async function addSongToPlaylist(playlistId: number, songId: number) {
  const db = getDb();

  await db
    .insertInto("playlists_songs")
    .values({
      playlist_id: playlistId,
      song_id: songId,
    })
    .execute();

  revalidatePath("/");
}

export async function removeSongFromPlaylist(
  id: number,
  playlistId: number,
  songId: number
) {
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
  const db = getDb();

  await db
    .deleteFrom("playlists_songs")
    .where("id", "=", id)
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();

  revalidatePath("/");
}

export async function likeSong(songId: number) {
  const db = getDb();
  const userId = 1; 

  try {
    await db
      .insertInto("liked_songs")
      .values({
        user_id: userId,
        song_id: songId,
        created_at: Math.floor(Date.now() / 1000),
      })
      .execute();

    revalidatePath("/");
  } catch (error) {
    
    console.log("Song already liked or error:", error);
  }
}

export async function unlikeSong(songId: number) {
  const db = getDb();
  const userId = 1; 

  await db
    .deleteFrom("liked_songs")
    .where("user_id", "=", userId)
    .where("song_id", "=", songId)
    .execute();

  revalidatePath("/");
}
