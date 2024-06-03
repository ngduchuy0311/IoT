import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import Control from '../components/Control';
import axios from 'axios';
import Chart from '../components/Chart';

function Dashboard() {
  const [data, setData] = useState({
    temperature: '',
    humidity: '',
    light: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getAllDashboard');
        const data = response.data;

        const latestData = data[data.length - 1];

        setData({
          temperature: latestData.temperature,
          humidity: latestData.humidity,
          light: latestData.brightness
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const getBackgroundColor = (value, type) => {
    if (type === 'temperature') {
      if (value >= 0 && value <= 10) return 'bg-red-200';
      if (value > 10 && value <= 20) return 'bg-red-300';
      if (value > 20 && value <= 30) return 'bg-red-400';
      if (value > 30 && value <= 40) return 'bg-red-500';
      if (value > 40) return 'bg-red-600';
    } else if (type === 'humidity') {
      if (value >= 0 && value <= 20) return 'bg-sky-300';
      if (value > 20 && value <= 40) return 'bg-sky-400';
      if (value > 40 && value <= 60) return 'bg-sky-500';
      if (value > 60 && value <= 80) return 'bg-sky-600';
      if (value > 80) return 'bg-sky-700';
    } else if (type === 'light') {
      if (value >= 0 && value <= 200) return 'bg-yellow-100';
      if (value > 200 && value <= 400) return 'bg-yellow-200';
      if (value > 400 && value <= 600) return 'bg-yellow-300';
      if (value > 600 && value <= 800) return 'bg-yellow-400';
      if (value > 800) return 'bg-yellow-500';
    }
  };

  const temperatureClass = getBackgroundColor(data.temperature, 'temperature');
  const humidityClass = getBackgroundColor(data.humidity, 'humidity');
  const lightClass = getBackgroundColor(data.light, 'light');

  return (
    <div className='mx-[10%]'>
      <div className="container">
        <div className={`box box1 ${temperatureClass}`}>
          <p>Nhiệt độ: {data.temperature}°C</p>
        </div>
        <div className={`box box2 ${humidityClass}`}>
          <p>Độ ẩm: {data.humidity}%</p>
        </div>
        <div className={`box box3 ${lightClass}`}>
          <p>Ánh sáng: {data.light} lux</p>
        </div>
      </div>

      <div className="nav">
        <div className="box4">
          <Chart />
        </div>
        <div className="hbox">
          <Control />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
