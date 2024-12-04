import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle} from  "@fortawesome/free-brands-svg-icons";
type pElementProps =  React.ComponentProps<'button'>;
type Props = {
    text:string
    className?:string
    props?: pElementProps
}

export const GoogleButton = ({text,className,props}: Props) =>{
  return (
    <button {...props} className={`${className}
                                w-full
                                h-8 
                                border border-white-400 
                                rounded-md 
                                bg-secondary-200 
                                text-white-100 
                                hover:bg-secondary-100 
                                hover:text-white-200
                                active:bg-secondary-300
                                text-xs
                            `}>
        <FontAwesomeIcon icon={faGoogle} className="px-2"/>
        {text}
    </button>
  );
}