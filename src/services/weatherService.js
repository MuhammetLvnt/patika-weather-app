import { DateTime } from "luxon";

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// API'den hava durumu verisi almak için kullanılacak olan fonksiyon
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType); // URL nesnesi oluşturuyoruz
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }); // URL'nin sorgu parametrelerini ayarlıyoruz

  // fetch API'sini kullanarak hava durumu verilerini alıyoruz ve JSON formatına çeviriyoruz
  return fetch(url).then((res) => res.json());
};

// API'den gelen güncel hava durumu verisini formatlayan fonksiyon
const formatCurrentWeather = (data) => {
  // API'den gelen veriyi değişkenlere atıyoruz
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  // Verileri bir obje halinde formatlıyoruz ve döndürüyoruz
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

// API'den gelen hava durumu tahmini verisini formatlayan fonksiyon
const formatForecastWeather = (data) => {
  // API'den gelen veriyi değişkenlere atıyoruz
  let { timezone, daily, hourly } = data;
  // Gün bazlı tahminlerin verilerini dizi halinde formatlıyoruz
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  // Saat bazlı tahminlerin verilerini dizi halinde formatlıyoruz
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// Hava durumunu almak için tüm verileri birleştiriyoruz.
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Tarihi ve saati belirli bir zamanda verilen konuma göre formatlayan bir fonksiyon tanımlıyoruz.
const formatLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatLocalTime, iconUrl };
