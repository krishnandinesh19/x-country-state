import React, { useState, useEffect } from "react";
import "./LocationSelector.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState("");
    setSelectedCity("");
    setSelectedLocation("");

    fetch(
      `https://crio-location-selector.onrender.com/country=${countryName}/states`
    )
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity("");
    setSelectedLocation("");

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`
    )
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSelectedLocation(
      <p>
        <span className="selected-text"> You selected </span>
        <span className="city">{cityName},</span>
        <span className="state"> {selectedState}, </span>
        <span className="country"> {selectedCountry} </span>
      </p>
    );
  };
  return (
    <div>
      <select
        id="countries"
        onChange={handleCountryChange}
        value={selectedCountry}
      >
        <option value="">-- Select Country --</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select id="states" onChange={handleStateChange} value={selectedState}>
        <option value="">-- Select State --</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select id="cities" onChange={handleCityChange} value={selectedCity}>
        <option value="">-- Select City --</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedLocation && (
        <p data-testid="selected-location">{selectedLocation}</p>
      )}
    </div>
  );
};

export default LocationSelector;
