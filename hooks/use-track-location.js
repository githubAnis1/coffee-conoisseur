import { useState } from "react";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const [isFindLocation,SetIsFindLocation] = useState(false)

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        SetIsFindLocation(false)
        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg("");
    };

    const error = () => {
        SetIsFindLocation(false)
        setLocationErrorMsg("Unable to retrieve your location");
        setLatLong("")
    };

    const handleTrackLocation = () => {
        SetIsFindLocation(true)
        if (!navigator.geolocation) {
        setLocationErrorMsg("Geolocation is not supported by your browser");
        } else {
        // status.textContent = "Locating…";
        SetIsFindLocation(true)
        navigator.geolocation.getCurrentPosition(success, error);// Api
        }
    };

    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindLocation,
    };
};

    export default useTrackLocation;