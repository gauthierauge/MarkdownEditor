import { Input } from '@/shared/components/ui/input'

type Props = {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ onChange, value }: Props) {
  return (
    <Input
      onChange={(event) => onChange(event.target.value)}
      placeholder="Rechercher un bloc..."
      type="search"
      value={value}
    />
  )
}

export default SearchBar
