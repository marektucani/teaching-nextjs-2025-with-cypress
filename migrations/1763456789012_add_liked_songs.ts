import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE liked_songs (
		id integer primary key autoincrement not null,
		user_id integer not null,
		song_id integer not null,
		created_at integer not null default (cast(unixepoch() as integer)),
		foreign key (user_id) references users (id),
		foreign key (song_id) references songs (id),
		unique (user_id, song_id)
	) STRICT`.execute(db);
}
