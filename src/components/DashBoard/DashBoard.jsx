import React, { useEffect, useState } from "react";
import Location from "../location/Location";
import Banner from "../banner/Banner";
import { InfoCard, TimeCard } from "../InfoCards/InfoCard";
import DateTime from "../DateTime/DateTime";
import { countryCode } from "../coutrycode";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import "./DashBoard.css";
import SearchBar from "../searchbar/Searchbar";
import Loading from "../loading/loading";
import ErrorP from "../error/error";

const apikey = "e155579ae279b15fe55f0a323293d0af";
const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cityWeather, setCityeWeather] = useState();
  const [city, setCity] = useState();
  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
            );
            const resData = await response.json();
            setCityeWeather(resData);
          } catch {
            setIsError(true);
          }
          setIsLoading(false);
        },
        (error) => {
          setCity("kolkata");
        }
      );
    };

    const getLocationbyCityName = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
        );
        const resData = await response.json();
        if(resData?.cod === "404"){
           
            setIsError(resData.message)
        }
        else{
            setCityeWeather(resData);
            setIsError(false)
        }
        
      } catch (error) {
        setIsError(error?.message||error || "invalid input");
      }
      setIsLoading(false);
    };

    if (!city) {
      getLocation();
    } else {
      getLocationbyCityName();
    }
  }, [city]);

  const precipitationMode = cityWeather?.precipitation?.mode || "no data";
  const feelLike = (cityWeather?.main.feels_like - 273.15).toFixed(0);

  return (
    <>
      {isError && (
        <AnimatePresence>
          <ErrorP message={isError} />
        </AnimatePresence>
      )}
      {isLoading ? (
        <AnimatePresence>
          <Loading />
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchBar setCity={setCity} />
            <div className="dashboard">
              <div className="maincol">
                <Location
                  countryCode={countryCode[cityWeather.sys.country]}
                  name={cityWeather.name}
                />
                <Banner
                  max={cityWeather.main.temp_max}
                  min={cityWeather.main.temp_min}
                  temperature={cityWeather.main.temp}
                  status={cityWeather.weather[0].description}
                />
                <div className="stats">
                  <InfoCard
                    field="humidity"
                    value={cityWeather.main.humidity}
                  />
                  <InfoCard field="wind" value={cityWeather.wind.speed} />
                  <InfoCard field="precipitation" value={precipitationMode} />
                  <InfoCard field="feels like" value={feelLike + "°C"} />
                </div>
              </div>
              <div className="sidecol">
                <DateTime />
                <div className="timecardHolder">
                  <TimeCard
                    title="Sunrise"
                    timestamp={cityWeather.sys.sunrise}
                    amORpm={"AM"}
                  />
                  <TimeCard
                    title="Sunset"
                    timestamp={cityWeather.sys.sunset}
                    amORpm={"PM"}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default DashBoard;
