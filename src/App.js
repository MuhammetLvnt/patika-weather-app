import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import SearchInput from "./components/SearchInput";
import Temperature from "./components/Temperature";
import TimeAndLocation from "./components/TimeAndLocation";
import getFormattedWeatherData from "./services/weatherService";
import { useTheme } from "./context/ThemeContext";

function App() {
  const [cityQuery, setCityQuery] = useState({ q: "antalya" });
  const [units] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const weatherData = async () => {
      await getFormattedWeatherData({ ...cityQuery, units }).then((data) => {
        setWeather(data);
      });
    };

    weatherData();
  }, [cityQuery, units]);

  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "secondTheme"
          ? "bg-gradient-to-r from-cyan-500 to-emerald-500"
          : "bg-gradient-to-r from-red-500 to-yellow-500"
      } mx-auto max-w-screen-md mt-4 py-5 px-32 h-fit shadow-xl shadow-gray-400`}
    >
      <SearchInput setCityQuery={setCityQuery} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <Temperature weather={weather} />
          <Forecast title="Saatlik Tahmin" items={weather.hourly} />
          <Forecast title="Günlük Tahmin" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
