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
    window.scrollTo(0, document.body.scrollHeight);
  }

  const clearLocation = () => {
    setLatitude('');
    setLongitude('');
    setSatellitesAmount('');
    setStarlinksData([]);
  }

  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h1 className='page-title'>Starlinks Finder</h1>
        <div className='inputs-line'>
          <label className='input-container'>
            <span>Latitude:</span>
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

          <label className='input-container'>
            <span>Longitude:</span>
            <input
              required
              type="number"
              name="longitude"
              value={longitude}
              className='input-item'
              placeholder="E.g: -46.170902"
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>

          <label className='input-container'>
            <span>Satellites amount:</span>
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
        </div>

        <div className='buttons-line'>
          <button type='button' onClick={clearLocation}>clear location</button>
          {supportLocation && <button type="button" className='secondary-button' onClick={getCurrentLocation}>get your location</button>}
          <button type='submit' className='primary-button'>find starlinks</button>
        </div>
      </form>

      <EarthGlobe satellitesData={starlinksData} />
    </div>
  )
}