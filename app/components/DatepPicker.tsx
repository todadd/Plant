const Datepicker = () => { 

    return (
        <div className="relative w-52">
            <input type="date" className="z-11 py-1 px-2 bg-white-50 w-full h-9 text-white-800 border border-white-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300 appearance-none"></input>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white-500"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 9h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            </div>
        </div>
    );
};

export default Datepicker;