import { FaGoogle, FaYahoo, FaYoutube } from 'react-icons/fa';
import { BsBing } from 'react-icons/bs';
import { SiDuckduckgo } from 'react-icons/si';

const searchEngines = [
  {
    engine: 'Google',
    url: 'https://www.google.com/search?q=',
    logo: (
      <FaGoogle
        style={{
          color: 'var(--search-engine-color)',
        }}
      />
    ),
    displayLogo: <FaGoogle className="logo" />,
    color: '#33A853',
  },
  {
    engine: 'Bing',
    url: 'https://www.bing.com/search?q=',
    logo: (
      <BsBing
        style={{
          color: 'var(--search-engine-color)',
        }}
      />
    ),
    displayLogo: <BsBing className="logo" />,
    color: '#174AE4',
  },
  {
    engine: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    logo: (
      <SiDuckduckgo
        style={{
          color: 'var(--search-engine-color)',
        }}
      />
    ),
    displayLogo: <SiDuckduckgo className="logo" />,
    color: '#E05E3A',
  },
  {
    engine: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    logo: <FaYahoo />,
    displayLogo: <FaYahoo className="logo" />,
    color: '#6321DC',
  },
  {
    engine: 'Youtube',
    url: 'https://www.youtube.com/results?search_query=',
    logo: (
      <FaYoutube
        style={{
          color: 'var(--search-engine-color)',
        }}
      />
    ),
    displayLogo: <FaYoutube className="logo" />,
    color: '#FF0000',
  },
];

export default searchEngines;
