import React, { useState } from 'react';
import light_on from '../img/light_on.png';
import light_off from '../img/light_off.png';
import Fan from '../img/fan_on.png';
const Control = () => {
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const handleLightToggle = () => {
    setLightOn(!lightOn)

  };
  const handleFanToggle = () => {
    setFanOn(!fanOn);
  };
  return (
    <>
      <div className="box5">
        <img className="img1" src={lightOn ? light_on : light_off} alt="" />
        <button
          className={`btn btn1 ${lightOn ? 'on' : 'off'}`}
          onClick={handleLightToggle}
        >
          {lightOn ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="box6">
      <img
        className={`img2 ${fanOn ? 'rotate' : ''}`}
        src={fanOn ? Fan : Fan}
        alt=""
      />
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
