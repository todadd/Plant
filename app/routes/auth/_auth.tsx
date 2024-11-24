import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
      <div className="h-screen w-screen bg-secondary-200 flex justify-center items-center">
        <div className="bg-primary-700 w-5/12 h-80 rounded-lg shadow-md flex">
            <div className="w-3/6 h-full">aa</div>
            <div className="w-3/6 h-full">
                <Outlet></Outlet>
            </div>
        </div>
      </div>
  );
}