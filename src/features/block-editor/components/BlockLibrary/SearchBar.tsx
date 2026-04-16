type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un bloc..."
      className="w-full bg-[#1a1a2e] text-gray-200 px-3 py-2 rounded border border-[#2e303a] outline-none focus:border-purple-400 text-sm"
    />
  );
}
