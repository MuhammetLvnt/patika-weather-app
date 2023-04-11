import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import Select from "react-select";
import cities from "./city";
import { useTheme } from "../context/ThemeContext";

function Inputs({ setCityQuery }) {
  const { toggleTheme } = useTheme();
  const [city, setCity] = useState("");

  // select inputundaki verinin döndürdüğü değeri city state'ine aktardım.
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setCity(selectedOption.label);
  };

  // city state'indeki veriyi search ederek ekrana yansıtmasını sağladım.
  const handleSearch = () => {
    if (city !== "") {
      setCityQuery({ q: city });
    }
  };

  // location button'a tıkladığında konumundaki hava durumunu vermesi için gereken kodlar
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setCityQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row justify-center items-center w-3/4 space-x-4">
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={cities}
          placeholder="Search..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"
        />

        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />

        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>
      <div className="flex justify-end ml-5">
        <button onClick={toggleTheme} className="border rounded-md w-28">
          Theme
        </button>
      </div>
    </div>
  );
}

export default Inputs;
