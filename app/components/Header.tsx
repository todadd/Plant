
import { Link as RemixLink } from '@remix-run/react'

export const Header = () =>{
  return (
    <div className="bg-primary-700 w-full h-20 ">
      <div className="flex justify-between items-center h-full px-5">
        <div className="flex">
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app">Home</RemixLink></div>
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app/plant">Plant</RemixLink></div>
          <div className="text-white-50 text-l mr-4"><RemixLink to="/app/care">Care</RemixLink></div>
        </div>
        
        <div className="flex items-center">
          <div className="text-white-500 text-s">John Doe</div>
          <div className="w-8 h-8 bg-white-500 rounded-full flex justify-center items-center ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-primary-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}