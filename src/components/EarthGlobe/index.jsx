import React from 'react';
import Globe from 'react-globe.gl'

export function EarthGlobe({ satellitesData }) {
  const pointsData = satellitesData.map(satellite => ({
    lat: satellite.latitude,
    lng: satellite.longitude,
    size: Math.random() / 3,
  }));

  return (
    <Globe
      width={800}
      pointAltitude="size"
      pointsData={pointsData}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    />
  )
}
