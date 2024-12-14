// routes/app/_layout.tsx
import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header"; // Headerのパスを適切に修正

export default function App() {
  return (
    <>
      <Header />
      <main className="h-full grow bg-secondary-200 h-px">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}