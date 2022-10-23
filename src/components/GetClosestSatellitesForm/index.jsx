import React, { useState } from 'react';
import { fetchClosestStarlinkSatellites } from '../../services/spacex-data';
const supportLocation = 'geolocation' in navigator;

export function GetClosestSatellitesForm() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [satellitesAmount, setSatellitesAmount] = useState('');

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await fetchClosestStarlinkSatellites(latitude, longitude, satellitesAmount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Latitude:
        <input
          required
          type="number"
          name="latitude"
          value={latitude}
          placeholder="E.g: -23.538645"
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>

      <label>
        Longitude:
        <input
          required
          type="number"
          name="longitude"
          value={longitude}
          placeholder="E.g: -46.170902"
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>

      <label>
        Satellites amount:
        <input
          min='1'
          required
          type="number"
          placeholder="E.g: 100"
          name="satellites-amount"
          value={satellitesAmount}
          onChange={(e) => setSatellitesAmount(e.target.value)}
        />
      </label>

      {supportLocation && <button type="button" onClick={getCurrentLocation}>Get its location</button>}
      <button type='submit'>Find Starlinks</button>
    </form>
  )
}