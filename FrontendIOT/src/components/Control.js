import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

import light_on from '../img/light_on.png';
import light_off from '../img/light_off.png';
import Fan from '../img/fan_on.png';

const Control = () => {
  const [lightOn, setLightOn] = useState(localStorage.getItem('lightOn') === 'true'); // Lấy trạng thái từ localStorage
  const [fanOn, setFanOn] = useState(localStorage.getItem('fanOn') === 'true'); // Lấy trạng thái từ localStorage

  const handleLightToggle = () => {
    const newLightOn = !lightOn;
    setLightOn(newLightOn);
    localStorage.setItem('lightOn', newLightOn); // Lưu trạng thái vào localStorage
    const mode = newLightOn ? 'on' : 'off'; // Toggle mode
    const device = 'Led'; // Define device name
    axios.post('http://localhost:8081/toggle', { mode, device }) // Send POST request to API
      .then(response => {
        console.log(response.data.message); // Log response from API
      })
      .catch(error => {
        console.error('Error toggling light:', error); // Log any errors
      });
  };

  const handleFanToggle = () => {
    const newFanOn = !fanOn;
    setFanOn(newFanOn);
    localStorage.setItem('fanOn', newFanOn); // Lưu trạng thái vào localStorage
    const mode = newFanOn ? 'on' : 'off'; // Toggle mode
    const device = 'Fan'; // Define device name
    axios.post('http://localhost:8081/toggle', { mode, device }) // Send POST request to API
      .then(response => {
        console.log(response.data.message); // Log response from API
      })
      .catch(error => {
        console.error('Error toggling fan:', error); // Log any errors
      });
  };

  return (
    <>
      <div className="box5 ">
       <div className='flex justify-center w-[80%] mx-auto mt-4'> 
        <img className="img1" src={lightOn ? light_on : light_off} alt="" />
       </div>
        <button
          className={`btn btn1 ${lightOn ? 'on' : 'off'}`}
          onClick={handleLightToggle}
        >
          {lightOn ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="box6">
        
       <div className='flex justify-center w-[80%] mx-auto '> 
        <img
          className={`img2 ${fanOn ? 'rotate' : ''}`}
          src={fanOn ? Fan : Fan}
          alt=""
        />
        </div>
        <button
          className={`btn btn2 ${fanOn ? 'on' : 'off'}`}
          onClick={handleFanToggle}
        >
          {fanOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </>
  );
};

export default Control;
