import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "default_secret";

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function createSession(token: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("token", token);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function destroySession(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}


export async function isLoggedIn(request: Request) {
  const session = await getSession(request);
  return session.has("token"); // トークンが存在すればログイン状態と判断
}