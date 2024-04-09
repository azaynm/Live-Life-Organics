import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Map = () => {
  // State to store the vehicle's coordinates
  const [vehicleCoordinates, setVehicleCoordinates] = useState({
    lat: 6.9270786, // default latitude
    lng: 79.861243, // default longitude
  });

  // Function to update the vehicle's coordinates (this could be a real-time update from a server, for example)
  const updateVehicleCoordinates = () => {
    // Here, you can implement logic to fetch real-time coordinates of the vehicle
    // For demonstration purpose, I'm just generating random coordinates within a specific range
    const newLat = 6.927 + Math.random() * 0.01;
    const newLng = 79.861 + Math.random() * 0.01;
    setVehicleCoordinates({ lat: newLat, lng: newLng });
  };

  // Update vehicle's coordinates every 5 seconds (you can adjust the interval as needed)
  useEffect(() => {
    const intervalId = setInterval(updateVehicleCoordinates, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Google Maps API initialization
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCqqV3SuLPH0ksj99djLNymQmu-a0HitPs', // Insert your Google Maps API key here
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={defaultCenter} // Center of the map
    >
      {/* Marker to show the vehicle's location */}
      <Marker position={vehicleCoordinates} />
    </GoogleMap>
  );
};

export default Map;
