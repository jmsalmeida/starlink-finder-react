const BASE_URL = 'http://localhost:3000/starlinks/closest-satellites';

export const fetchClosestStarlinkSatellites = async (latitude, longitude, satellitesAmount) => {
  const queryParams = `latitude=${latitude}&longitude=${longitude}&satellites_amount=${satellitesAmount}`;

  try {
    // TODO: Add user feedback
    const response = await fetch(`${BASE_URL}?${queryParams}`).then(response => response.json());
    console.log(response)
  } catch (error) {
    // TODO: handle error
  }
}