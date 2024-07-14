import React from 'react'
import "./Location.css"

const Location = ({countryCode, name}) => {
  return (
    <div className="location">
        <div className="exact">{name}</div>
        <div className="country">{countryCode}</div>
    </div>
  )
}

export default Location