// import searchIcon from "../assests/search.png";
import { useRef, useState } from "react";
import iconsCodes from "../utilites/iconsCodes.js";

export default function Weather() {
  const inputRef = useRef();

  const [weatherState, setWeatherState] = useState(null);

  async function handleSearch() {
    const cityName = inputRef.current.value;
    const response = await fetch(
      `https://${import.meta.env.VITE_APP_WEATHER_API_HOST}?q=${cityName}&key=${import.meta.env.VITE_APP_API_KEY}`,
    );
    if (!response.ok){
      console.log('City Not Found')
    }
    const data = await response.json();
    const iconPath = `/src/assests/${iconsCodes[data.current.condition.code]}.${data.current.is_day ? "day" : "night"}.png`;

    console.log(iconPath);

    setWeatherState((prev) => {
      return {
        temp: data.current.temp_c,
        locationName: data.location.name,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        isDay: data.current.is_day,
        condition: data.current.condition.text,
        icon: iconPath,
      };
    });
    inputRef.current.value = ''
  }

  return (
    <div className="font-sans bg-purple-800 shadow-xl p-8 rounded-lg flex flex-col items-center w-75">
      <div className="flex items-center justify-between w-full">
        <input
          ref={inputRef}
          type="text"
          className="bg-white rounded-full h-8 box-border w-45 p-3 font-bold outline-none"
          placeholder="Search"
        />
        <button
          className="bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <img src={'/src/assests/search.png'} />
        </button>
      </div>
      {weatherState ? (
        <>
          <img src={weatherState.icon} className="w-40 mt-5"></img>
          <p className="text-white text-[55px] ">{weatherState.temp}°C</p>
          <p className="text-white text-[35px] mt-[-15px]">
            {weatherState.locationName}
          </p>
          <div className="flex mt-5 text-white justify-between w-full">
            <div
              className="flex justify-center 
items-start"
            >
              <img src={'/src/assests/humidity.png'} className="w-[25px] mt-2"></img>
              <div className="flex flex-col ml-1">
                <p>{weatherState.humidity} %</p>
                <span>Humitidy</span>
              </div>
            </div>

            <div
              className="flex justify-center 
          items-start"
            >
              <img
                src={"/src/assests/wind.png"}
                className="w-[25px] mt-2 "
              ></img>
              <div className="flex flex-col ml-1 ">
                <p>{weatherState.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
