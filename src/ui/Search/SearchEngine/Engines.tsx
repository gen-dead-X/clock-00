import { FaGoogle, FaYahoo, FaYoutube } from 'react-icons/fa';
import { BsBing } from 'react-icons/bs';
import { SiDuckduckgo } from 'react-icons/si';

const searchEngines = [
  {
    engine: 'Google',
    url: 'https://www.google.com/search?q=',
    logo: <FaGoogle />,
    displayLogo: <FaGoogle className="logo" />,
  },
  {
    engine: 'Bing',
    url: 'https://www.bing.com/search?q=',
    logo: <BsBing />,
    displayLogo: <BsBing className="logo" />,
  },
  {
    engine: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    logo: <SiDuckduckgo />,
    displayLogo: <SiDuckduckgo className="logo" />,
  },
  {
    engine: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    logo: <FaYahoo />,
    displayLogo: <FaYahoo className="logo" />,
  },
  {
    engine: 'Youtube',
    url: 'https://www.youtube.com/results?search_query=',
    logo: <FaYoutube />,
    displayLogo: <FaYoutube className="logo" />,
  },
];

export default searchEngines;
