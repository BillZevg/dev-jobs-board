function SearchBar({ value, onChange }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)}></input>
  );
}

export default SearchBar;
