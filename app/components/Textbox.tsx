type Props = React.ComponentProps<'input'>;
export const Textbox = (props: Props) =>{
  return (
    <input type="text" className="py-1 
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
                                active:border-none" {...props} >
    </input>
  );
}