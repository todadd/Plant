type pElementProps =  React.ComponentProps<'button'>;
type Props = {
    text:string
    className?:string
    props?: pElementProps
}

export const Button = ({text,className,props}: Props) =>{
  return (
    <button {...props} className={`${className}
                                w-full
                                h-8 
                                border border-white-400 
                                rounded-md 
                            `}>
        {text}
    </button>
  );
}