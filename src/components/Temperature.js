import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatLocalTime, iconUrl } from "../services/weatherService";

function Temperature({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex justify-center items-center py-6 text-xl text-cyan-500">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrl(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light items-center justify-center text-sm">
            <UilTemperature size={18} className="mr-1" />
            Hissedilen :
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light items-center justify-center text-sm">
            <UilTear size={18} className="mr-1" />
            Nem :
            <span className="font-medium ml-1">{`${humidity?.toFixed()}%`}</span>
          </div>
          <div className="flex font-light items-center justify-center text-sm">
            <UilWind size={18} className="mr-1" />
            Rüzgar :
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light ">
          Rise:
          <span className="font-medium ml-1">
            {formatLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light ">
          Set:
          <span className="font-medium ml-1">
            {formatLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light ">
          High:
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light ">
          Low:
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
