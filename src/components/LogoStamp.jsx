import React from 'react';
import logo from '../assets/DEV_logos-05_Green-02_transparent_alpha.png';  // Import the image

export default function LogoStamp({ width = 'auto', height = '48px' }) {
    return (
      <div className="flex items-center">
      {/* Logo Image with size variable setup */}
      <img src={logo} alt="Logo" style={{ width, height }} className="w-auto h-12 mr-2 rounded-default" />
  </div>
);
}