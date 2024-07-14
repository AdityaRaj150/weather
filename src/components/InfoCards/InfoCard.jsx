import React from "react";
import "./InfoCard.css";
// import humidity from
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudShowersHeavy, faDroplet, faTemperatureThreeQuarters, faWind } from "@fortawesome/free-solid-svg-icons";
import sunrise from "../../assets/sunrise.svg"

var iconmap = {
    "feels like": faTemperatureThreeQuarters,
    humidity: faDroplet,
    wind: faWind,
    "precipitation": faCloudShowersHeavy,
};

export const InfoCard = ({ field, value }) => {
    return (
        <div className="info-card">
            <div className="icon">
                <FontAwesomeIcon icon={iconmap[field]} />
            </div>
            <div className="value">{value}</div>
            <div className="field">{field}</div>
        </div>
    );
};

export function TimeCard({ title,timestamp, amORpm }) {

        const date = new Date(timestamp * 1000)
        const timeBig = date.toLocaleTimeString();
        const time = timeBig.substring(0,5)
    
    return (
        <div className="time-card">
            <div className="field">{title}</div>
            <div className="time">
                <img src={sunrise} alt="" srcSet="" className="sun-icon" />
                <span>{time}</span>
                <span style={{ fontSize: "1rem" }}> {amORpm}</span>
            </div>
        </div>
    );
}
