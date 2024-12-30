import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions,ComboboxButton } from '@headlessui/react'
import { useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

function Select() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
<Combobox value={selectedPerson} onChange={(value) => setSelectedPerson(value ?? people[0])}>
  <div className="relative w-full">
    <ComboboxInput
      className="py-1 px-2 bg-white-50 w-full h-9 text-white-800 border border-white-300 rounded focus:outline-none focus:border-2 focus:border-primary-300"
      displayValue={(person: { id: number; name: string }) => person?.name}
      onChange={(event) => setQuery(event.target.value)}
    />
    <ComboboxButton className="absolute inset-y-0 right-0 px-2.5 text-white-500">
      <FaChevronDown className="text-lg" />
    </ComboboxButton>
    <ComboboxOptions
      className="absolute z-10 mt-1 bg-white-50 rounded-lg shadow-lg border border-white-300 w-full"
    >
      {filteredPeople.map((person) => (
        <ComboboxOption
          key={person.id}
          value={person}
          className="group flex cursor-default gap-2 rounded-lg py-1.5 px-1.5 select-none text-white-800 hover:bg-primary-500/50 hover:text-white w-full"
        >
          <div>{person.name}</div>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  </div>
</Combobox>

  )
}

export default Select