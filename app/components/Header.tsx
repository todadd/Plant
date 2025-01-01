import { Link as RemixLink, useFetcher } from "@remix-run/react";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const Header = () => {
  const fetcher = useFetcher();

  const handleLogout = () => {
    fetcher.submit(null, { method: "post", action: "/logout" });
  };

  return (
    <div className="bg-primary-700 w-full h-20 ">
      <div className="flex justify-between items-center h-full px-5">
        <div className="flex">
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app">Home</RemixLink></div>
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app/plant">Plant</RemixLink></div>
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app/care">Care</RemixLink></div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-8 bg-white-500 rounded-full flex justify-center items-center ">
            <button onClick={handleLogout}><RiLogoutBoxRLine></RiLogoutBoxRLine></button>
          </div>
        </div>
      </div>
    </div>
  );
}