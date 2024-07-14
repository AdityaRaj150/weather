import React from "react";
import "./Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import Cloudy from "../../assets/cloudy.png"

const Banner = ({temperature, min, max, status}) => {
    temperature = (temperature - 273.15).toFixed(0)
    min = (min - 273.15).toFixed(1)
    max = (max - 273.15).toFixed(1)
    return (
        <div className="banner">
            <div className="typography">
                <div className="temperature">{temperature}°C</div>
                <div className="minmax">
                    <div className="label">
                    <FontAwesomeIcon icon="fa-thin fa-temperature-low" />
                        <FontAwesomeIcon icon={faTemperatureHigh} color="var(--light)"/>
                        {" "}
                        {max}°C
                    </div>
                    <div className="label">
                        <FontAwesomeIcon icon={faTemperatureLow} color= 'var(--light)'/>
                        {" "}
                        {min}°C
                    </div>
                </div>
                <div className="status">
                    {status}
                </div>
            </div>
            <div className="image">
                <img src = {Cloudy} />
            </div>
        </div>
    );
};

export default Banner;
