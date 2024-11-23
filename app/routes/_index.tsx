import { redirect } from "@remix-run/node";

// Loaderでリダイレクトを設定
export const loader = async () => {
  return redirect("/login");
};

export default function Index() {
  // このコンポーネントは実際にはレンダリングされない
  return null;
}