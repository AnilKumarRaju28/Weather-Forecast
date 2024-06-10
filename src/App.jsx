import { TiWeatherSunny } from "react-icons/ti";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempDetails from "./components/TempDetails";
import Forecast from "./components/Forecast";
import getFormattedData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {

  const [query, setQuery] = useState({ q: "Hyderabad  " })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    const cityName = query.q ? query.q : 'current location';
    toast.info(`Fetching data for ${capitalizeFirstLetter(cityName)}`)
    try {
      await getFormattedData({ ...query, units }).then(data => {
        toast.success(`Fetched data for ${data.name}, ${data.country}`)
        setWeather(data)
      })
    } catch (error) {
      console.error('Error getting weather:', error);
    }
  };
  useEffect(() => {
    getWeather()
  }, [query, units])


  const formatBackground = () => {
    if (!weather) return "from-cyan-400 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-400 to-blue-700"
    return "from-yellow-600 to-orange-600"
  }


  return (
    <>
      <div className={`mx-auto py-5 px-10 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />
        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempDetails weather={weather} units={units} />
            <Forecast title='3 hours ahead forecast' data={weather.hourly} />
            <Forecast title='Daily forecast ' data={weather.daily} />
          </>
        )}

        <ToastContainer autoClose={2500} hideProgressBar={true} theme='colored' />
      </div >
    </>
  );
}

export default App;
