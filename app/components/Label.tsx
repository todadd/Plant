type pElementProps =  React.ComponentProps<'p'>;
type Props = {
    text:string
    className?:string
    props?: pElementProps
}

export const Label = ({text,className,props}: Props) =>{
  return (
    <p {...props} className={`${className} mb-1`}>
        {text}
    </p>
  );
}