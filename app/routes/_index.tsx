import { redirect, LoaderFunction } from "@remix-run/node";
import { isLoggedIn } from "../utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const loggedIn = await isLoggedIn(request);
  if (!loggedIn) {
    return redirect("/login");
  }
  return redirect("/app");
};
