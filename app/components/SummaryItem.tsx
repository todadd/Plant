type Props = {
    title: string;
    value: number;
    prefix: string;
  };
  
  export default function SummaryItem({ title, value, prefix }: Props) {
    return (
      <div className="w-full">
          <p className="py-0.5 inline-block w-full text-white-500 text-xl">{title}</p>
          <p className="py-0.5 border-b border-white-100 inline-block w-full text-primary-700 text-2xl text-right font-bold">{value.toLocaleString()}</p>
          <p className="py-0.5 inline-block w-full text-white-500 text-xl text-right">{prefix}</p>
      </div>
    );
  }