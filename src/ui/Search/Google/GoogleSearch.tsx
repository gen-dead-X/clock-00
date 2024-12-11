import { CiSearch } from 'react-icons/ci';
import './GoogleSearch.scss';
import { useEffect, useRef, useState } from 'react';
import SearchEngine from '../SearchEngine/SearchEngine';
import searchEngines from '../SearchEngine/Engines';

export default function GoogleSearch() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [currentSearchEngine, setCurrentSearchEngine] = useState(searchEngines[0]);
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (search) {
      window.open(`${currentSearchEngine.url}${search}`);
      setSearch('');
    }
  }

  function handleButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    handleSearch(e as unknown as React.FormEvent);
  }

  useEffect(() => {
    if (!formRef.current) return;

    formRef.current.classList.add('search-change-animation');

    setTimeout(() => {
      if (!formRef.current) return;

      formRef.current.classList.remove('search-change-animation');
    }, 300);
  }, [currentSearchEngine]);

  return (
    <div
      className={`${active ? 'fixed left-0 top-0 z-20 h-dvh w-dvw bg-white dark:bg-slate-900' : ''} transition-all duration-300`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <form
          ref={formRef}
          onFocus={() => setActive(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setActive(false); // Only close if focus moves outside the form
            }
          }}
          onSubmit={handleSearch}
          style={
            {
              '--search-engine-color': currentSearchEngine.color,
            } as React.CSSProperties
          }
          className={`google-search-container fixed bottom-[10rem] left-[50%] z-30 flex h-auto w-[12rem] translate-x-[-50%] ${active ? 'google-search-container-active' : ''}`}
        >
          {currentSearchEngine.displayLogo}

          <input
            type="text"
            id="googleSearch"
            placeholder={`Search ${currentSearchEngine.engine}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={`search-icon ${active ? '' : 'hidden'}`}
            type="button"
            onClick={handleButtonClick}
          >
            <CiSearch />
          </button>
        </form>

        <div
          className={`engine-container mt-[10rem] flex flex-col gap-5 rounded-3xl border-gray-200 p-4 transition-all duration-300 dark:border-white ${active ? 'scale-100' : 'scale-0'}`}
        >
          <div className="t flex items-center gap-5 text-4xl">
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
