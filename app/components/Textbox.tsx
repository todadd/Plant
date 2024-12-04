type Props = React.ComponentProps<'input'>;
export const Textbox = (props: Props) =>{
  return (
    <input type="text" className="p-1 
                                bg-white-50 
                                w-full
                                h-8 
                                text-white-800 
                                border border-white-400 
                                rounded-md 
                                focus:outline-none
                                focus:border-2
                                focus:border-primary-300 
                                active:border-none" {...props} >
    </input>
  );
}