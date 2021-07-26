import React, {useEffect, useState} from 'react';
import './search-bar.scss';
import useDebounce from "../../hooks/useDebounce";

function SearchBar({fetchData = {} as any}) {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedSearchTerm = useDebounce(keyword, 500);

  useEffect(() => {
      fetchData(debouncedSearchTerm);
    }, [debouncedSearchTerm]
  );

  return (
    <div className='search-bar'>
      <div className='search-bar__input'>
        <input className="search-bar__input-input"
               type="text"
               placeholder="Movie search by title / year"
               onChange={event => setKeyword(event.target.value)}/>
        <span className="focus-border"/>
      </div>
    </div>
  );
}

export default SearchBar;
