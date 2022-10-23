import React, { useState } from 'react';
import { fetchClosestStarlinkSatellites } from '../../services/spacex-data';
import { EarthGlobe } from '../EarthGlobe';
const supportLocation = 'geolocation' in navigator;

export function GetClosestSatellitesForm() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [starlinksData, setStarlinksData] = useState([]);
  const [satellitesAmount, setSatellitesAmount] = useState('');

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const closestSatellites = await fetchClosestStarlinkSatellites(latitude, longitude, satellitesAmount);
    setStarlinksData(closestSatellites);
  }

  const clearLocation = () => {
    setLatitude('');
    setLongitude('');
    setSatellitesAmount('');
    setStarlinksData([]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            required
            type="number"
            name="latitude"
            value={latitude}
            data-testid="lat-input"
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
            data-testid="long-input"
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
            data-testid="satellites-amount"
            onChange={(e) => setSatellitesAmount(e.target.value)}
          />
        </label>

        <button type='button' onClick={clearLocation}>clear location</button>
        {supportLocation && <button type="button" onClick={getCurrentLocation}>get its location</button>}
        <button type='submit'>find starlinks</button>
      </form>

      <EarthGlobe satellitesData={starlinksData} />
    </>
  )
}