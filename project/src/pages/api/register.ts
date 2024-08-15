import type { APIContext } from "astro";
import { generateId } from "lucia";
import { db, User } from "astro:db";
import { lucia } from "../../auth";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  console.log(formData);

  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");

  if (!username || !password) {
    return new Response("Username or Password are required", { status: 400 });
  }

  if (typeof username !== "string" || username.length < 4) {
    return new Response("Username must be at least 4 characters", {
      status: 400,
    });
  }

  if (typeof password !== "string" || password.length < 4) {
    return new Response("Password must be at least 4 characters", {
      status: 400,
    });
  }

  if (typeof email !== "string" || password.length < 4) {
    return new Response("Password must be at least 4 characters", {
      status: 400,
    });
  }

  const userId = generateId(15);

  await db.insert(User).values([
    {
      id: userId,
      username: username,
      password: password,
      email: email,
    },
  ]);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return context.redirect("/");
}
