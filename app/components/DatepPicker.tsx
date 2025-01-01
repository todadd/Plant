import React from "react";
interface DateProps {
    value:Date
    name:string
    onChange:React.Dispatch<React.SetStateAction<Date>>
} 

const Datepicker:React.FC<DateProps> = ({value,name,onChange}) => { 

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 月を2桁に
        const day = String(date.getDate()).padStart(2, "0"); // 日を2桁に
        return `${year}-${month}-${day}`;
      };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        onChange(date);
    }
    return (
        <div className="relative w-52">
            <input type="date" value={formatDate(value)} name={name} onChange={(e) => handleChange(e)} className="z-11 py-1 px-2 bg-white-50 w-full h-9 text-white-800 border border-white-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300 appearance-none"></input>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none cursor-pointer">
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