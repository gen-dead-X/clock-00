import { FaGoogle, FaYahoo, FaYoutube } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { BsBing } from 'react-icons/bs';
import './GoogleSearch.scss';
import { SiDuckduckgo } from 'react-icons/si';
import { useState } from 'react';

const searchEngines = [
  { engine: 'Google', url: 'https://www.google.com/search?q=', logo: <FaGoogle /> },
  { engine: 'Bing', url: 'https://www.bing.com/search?q=', logo: <BsBing /> },
  { engine: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', logo: <SiDuckduckgo /> },
  { engine: 'Yahoo', url: 'https://search.yahoo.com/search?p=', logo: <FaYahoo /> },
  { engine: 'Youtube', url: 'https://www.youtube.com/results?search_query=', logo: <FaYoutube /> },
];

export default function GoogleSearch() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [searchEngine, setSearchEngine] = useState(searchEngines[0]);

  function handleSearch() {
    if (search) {
      window.open(`${searchEngine.url}${search}`);
      setSearch('');
    }
  }

  return (
    <div
      className={`${active ? 'fixed left-0 top-0 z-20 h-dvh w-dvw bg-white dark:bg-slate-900' : ''} transition-all duration-300`}
    >
      <form
        onSubmit={handleSearch}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={`google-search-container fixed bottom-[10rem] left-[50%] z-30 flex h-auto w-[12rem] translate-x-[-50%] ${active ? 'google-search-container-active' : ''}`}
      >
        <FaGoogle className="logo" />

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

        <div
          className={`absolute left-[50%] top-20 flex translate-x-[-50%] flex-col gap-5 rounded-3xl border-gray-200 p-4 dark:border-white ${active ? 'scale-100' : 'scale-0'}`}
        >
          <p className="text-center">Search Engines</p>

          <div className="flex items-center gap-5 text-4xl">
            {searchEngines.map((engine) => (
              <div
                className={`rounded-full p-2 ${engine.engine === searchEngine.engine ? 'text-blue-600' : ''}`}
                key={engine.engine}
              >
                <button onClick={() => setSearchEngine(engine)} type="button">
                  {engine.logo}
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
