import React from "react";

type Props = React.ComponentProps<'input'>;
// eslint-disable-next-line react/prop-types
export const Textbox:React.FC<Props>= ({ value, onChange, ...rest }) =>{
  return (
    <input type="text" value={value} onChange={onChange} className="py-1 
                                px-2
                                bg-white-50 
                                w-full
                                h-9
                                text-white-800 
                                border border-white-300 
                                rounded
                                focus:outline-none
                                focus:border-2
                                focus:border-primary-300 
                                active:border-none" {...rest}>
    </input>
  );
}