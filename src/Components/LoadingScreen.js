import React from 'react';
import '../stylesheets/loading.css'; // You can create a CSS file to style your loading screen

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
