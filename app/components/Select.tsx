import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions,ComboboxButton } from '@headlessui/react'
import React ,{ useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";

interface SelectProps {
  options: { value: string; name: string }[];
  name: string;
  selected: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
}
const Select:React.FC<SelectProps> = ({options,name,selected}) =>{
  const [selectedOption, setSelectedOption] = useState(selected)

  return (
<Combobox value={selectedOption} onChange={(value) => setSelectedOption(value ?? options[0].value)}>
  <div className="relative w-full">
    <ComboboxInput
      className="py-1 px-2 bg-white-50 w-full h-9 text-white-800 border border-white-300 rounded focus:outline-none focus:border-2 focus:border-primary-300"
      name={name}
    />
    <ComboboxButton className="absolute inset-y-0 right-0 px-2.5 text-white-500">
      <FaChevronDown className="text-lg" />
    </ComboboxButton>
    <ComboboxOptions
      className="absolute z-10 mt-1 bg-white-50 rounded-lg shadow-lg border border-white-300 w-full"
    >
      {options.map((option) => (
        <ComboboxOption
          key={option.value}
          value={option.value}
          className="group flex cursor-default gap-2 rounded-lg py-1.5 px-1.5 select-none text-white-800 hover:bg-primary-500/50 hover:text-white w-full"
        >
          <div>{option.name}</div>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  </div>
</Combobox>

  )
}

export default Select