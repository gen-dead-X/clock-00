import { FaGoogle } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import './GoogleSearch.scss';
import { useState } from 'react';

export default function GoogleSearch() {
  const [search, setSearch] = useState('');

  function handleSearch() {
    if (search) {
      window.open(`https://www.google.com/search?q=${search}`);
      setSearch('');
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="google-search-container fixed bottom-[10rem] left-[50%] z-30 w-[10rem] translate-x-[-50%] lg:w-[40rem]"
    >
      <FaGoogle className="logo" />

      <input
        type="text"
        id="googleSearch"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="search-icon" type="submit">
        <CiSearch />
      </button>
    </form>
  );
}
