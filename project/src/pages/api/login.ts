import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string") {
    return new Response("Username must be at least 4 characters", {
      status: 400,
    });
  }

  if (typeof password !== "string") {
    return new Response("Username must be at least 4 characters", {
      status: 400,
    });
  }

  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);

  if (!foundUser) {
    return new Response("Incorrect username or password", { status: 404 });
  }

  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return context.redirect("/");
}
