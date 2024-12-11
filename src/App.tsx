import './App.scss';
import { UserContextProvider } from './Context/UserContext';
import Home from './pages/Home/Home';
import WeatherProvider from './Providers/Weather/WeatherProvider';
import DefaultContextMenu from './ui/Global/DefaultContextMenu/DefaultContextMenu';
import GoogleSearch from './ui/Search/Google/GoogleSearch';

function App() {
  return (
    <UserContextProvider>
      <WeatherProvider>
        <div className="main-wrapper">
          <DefaultContextMenu>
            <Home />
            <GoogleSearch />
          </DefaultContextMenu>
        </div>
      </WeatherProvider>
    </UserContextProvider>
  );
}

export default App;
