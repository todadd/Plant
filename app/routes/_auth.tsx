import { Outlet } from "@remix-run/react";
import { Label } from "~/components/Label";
import { useAuth } from "~/hooks/useAuth";

export default function Index() {
  const { isSignIn, handleToggle } = useAuth(); // Hookを利用
    
  return (
      <div className="h-screen w-screen bg-secondary-200 flex flex-col justify-center items-center">
        <div className="bg-primary-700 w-6/12 h-96 rounded-lg shadow-md flex">
            <div className="w-3/6 h-full"></div>
            <div className="w-3/6 h-full">
                <Outlet></Outlet>
            </div>
        </div>
        <div className="text-center mt-7">
          <Label text={isSignIn ? "Don't have an account?" : "Already have an account?" }className="text-white-500"></Label>
          <button onClick={handleToggle}>
          <Label
            text={isSignIn ? "Create Account" : "Sign In"} // 状態に応じた表示
            className="mt-2 text-white-500 font-bold"
          ></Label>
        </button>
        </div>
      </div>
  );
}