import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

interface SearchBarProps {
  visible?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ visible }) => {
  const router = useRouter();

  const [searchbar, setSearchBar] = useState('');

  const searchTerm = useCallback(
    () => router.push(`/search/${searchbar}`),
    [router, searchbar]
  );

  return (
    <div className="h-6 flex ">
      <input
        className="
      block
      pl-2
      pb-1
      w-full
      text-xs
      lg:text-lg
      bg-zinc-700
      text-white
      appearance-none
      focus:outline-none
      peer
      bg-opacity-0
      "
        placeholder="find a trailer"
        id="searchbar"
        type="text"
        value={searchbar}
        onChange={(e: any) => setSearchBar(e.target.value)}
      />
      <BiSearchAlt
        onClick={() => {
          if (searchbar !== '') {
            searchTerm();
          }
        }}
        className="text-white md:w-8 w-4 h-full justify-self-center "
      />
    </div>
  );
};

export default SearchBar;
