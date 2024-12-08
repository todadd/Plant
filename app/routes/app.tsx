// routes/app/_layout.tsx
import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header"; // Headerのパスを適切に修正

export default function Index() {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}