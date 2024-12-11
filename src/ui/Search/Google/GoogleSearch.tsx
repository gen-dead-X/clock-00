import { CiSearch } from 'react-icons/ci';
import './GoogleSearch.scss';
import { useState } from 'react';
import SearchEngine from '../SearchEngine/SearchEngine';
import searchEngines from '../SearchEngine/Engines';

export default function GoogleSearch() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [currentSearchEngine, setCurrentSearchEngine] = useState(searchEngines[0]);

  function handleSearch() {
    if (search) {
      window.open(`${currentSearchEngine.url}${search}`);
      setSearch('');
    }
  }

  return (
    <div
      className={`${active ? 'fixed left-0 top-0 z-20 h-dvh w-dvw bg-white dark:bg-slate-900' : ''} transition-all duration-300`}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <form
          onSubmit={handleSearch}
          className={`google-search-container fixed bottom-[10rem] left-[50%] z-30 flex h-auto w-[12rem] translate-x-[-50%] ${active ? 'google-search-container-active' : ''}`}
        >
          {currentSearchEngine.displayLogo}

          <input
            type="text"
            id="googleSearch"
            placeholder="Search Google"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className={`search-icon ${active ? '' : 'hidden'}`} type="submit">
            <CiSearch />
          </button>
        </form>

        <div
          className={`mt-[10rem] flex flex-col gap-5 rounded-3xl border-gray-200 p-4 transition-all duration-300 dark:border-white ${active ? 'scale-100' : 'scale-0'}`}
        >
          <p className="text-center">Search Engines</p>
          <div className="flex items-center gap-5 text-4xl">
            {searchEngines.map((engine) => (
              <SearchEngine
                searchEngine={currentSearchEngine}
                engine={engine}
                key={engine.engine}
                setSearchEngine={setCurrentSearchEngine}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
