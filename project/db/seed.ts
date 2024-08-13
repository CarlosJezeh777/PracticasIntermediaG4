import { db, Users } from "astro:db";

export default async function seed() {
  await db.insert(Users).values([
    { name: "Alice", passwd: "1234" },
    { name: "Bob", passwd: "1234 " },
  ]);
}
