import React from 'react'

const Location = () => {
    const getLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    const geoSuccess = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        alert(`lat: ${lat} lng: ${lng}`)
    }

    const geoError = () => {
        alert('geo failed')
    }

    return (
        <div>
            location
            <button onClick={getLocation}>localisation</button>
        </div>
    )
}

export default Location
