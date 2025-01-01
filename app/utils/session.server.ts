/* eslint-disable @typescript-eslint/ban-types */
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import jwt from "jsonwebtoken";

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

//クッキーに保存されたユーザー情報を返す
export async function returnUser(request: Request):Promise<string> {
  const session = await getSession(request);
  const token = session.get("token");
  const secret = process.env.JWT_SECRET || "default_secret";

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return "";
  }
}

//セッションチェック用のミドルウェア
export function withAuth(loaderOrAction: Function) {
  return async (args: { request: Request }) => {
    const { request } = args;

    // セッション確認
    const loggedIn = await isLoggedIn(request);
    if (!loggedIn) {
      return redirect("/login"); // 未ログインならログインページへリダイレクト
    }

    // ローダーまたはアクションを実行
    return loaderOrAction(args);
  };
}