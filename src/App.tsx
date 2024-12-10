import { useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import { UserContextProvider } from './Context/UserContext';
import Home from './pages/Home/Home';
import DefaultContextMenu from './ui/Global/DefaultContextMenu/DefaultContextMenu';
import { differenceInHours } from 'date-fns';
import config from './config/config';

function App() {
  useEffect(() => {
    async function getWeather() {
      try {
        const cachedWeather = localStorage.getItem('weather');

        if (cachedWeather) {
          const weatherTime = localStorage.getItem('weatherTime');

          if (weatherTime) {
            const cachedTime = new Date(weatherTime);
            const currentTime = new Date();

            if (differenceInHours(currentTime, cachedTime) < 4) {
              console.log('Using cached weather data.', JSON.parse(cachedWeather));
              return;
            }
          }
        }

        const res = (
          await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/22.577410089467445%2C%2088.43149364671405?unitGroup=metric&key=${config.WEATHER_API}&contentType=json`,
          )
        ).data;

        localStorage.setItem('weather', JSON.stringify(res));
        localStorage.setItem('weatherTime', new Date().toISOString());
      } catch (e) {
        console.log(e);
      }
    }

    getWeather();
  }, []);

  return (
    <UserContextProvider>
      <div className="main-wrapper">
        <DefaultContextMenu>
          <Home />
        </DefaultContextMenu>
      </div>
    </UserContextProvider>
  );
}

export default App;
