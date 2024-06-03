import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Humidity',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Brightness',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchDataAndUpdateChart = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getAllDashboard');
        const latestData = response.data.slice(-5);

        const newLabels = latestData.map((item) => format(new Date(item.datetime), 'HH:mm:ss'));
        const temperatureData = latestData.map((item) => item.temperature);
        const humidityData = latestData.map((item) => item.humidity);
        const brightnessData = latestData.map((item) => item.brightness);

        setChartData({
          labels: newLabels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatureData,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Humidity',
              data: humidityData,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Brightness',
              data: brightnessData,
              borderColor: 'rgba(255, 206, 86, 1)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching and updating chart data:', error);
      }
    };

    fetchDataAndUpdateChart();
    const interval = setInterval(fetchDataAndUpdateChart, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
