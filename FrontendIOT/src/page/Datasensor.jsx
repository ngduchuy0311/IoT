import React, { useState, useEffect } from 'react';
import '../css/Datasensor.css';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormPrevious } from "react-icons/gr";
import { format } from 'date-fns';
import { GrFormNext } from "react-icons/gr";
import { FaSort } from "react-icons/fa6";

const Datasensor = () => {
  const [sensorData, setSensorData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang

  const fetchData = async (page = activePage) => {
    try {
      const response = await axios.get(`http://localhost:8081/getAllSensor?page=${page}&pageSize=${itemsPerPage}`);
      setSensorData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSortedData = async (sortField) => {
    try {
      const response = await axios.get(`http://localhost:8081/sortDataSensor?page=${activePage}&pageSize=${itemsPerPage}&sortOrder=${sortOrder}&sortBy=${sortField}`);
      setSensorData(response.data);
      toast.success(`Sorted by ${sortField} successfully`);
    } catch (error) {
      console.error('Error fetching sorted data:', error);
    }
  };

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/searchDataSensor?type=${searchType}&value=${searchValue}&page=${activePage}&pageSize=${itemsPerPage}`);
      setSensorData(response.data);
      toast.success(`Search by ${searchType} successfully`);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  useEffect(() => {
    fetchData(activePage);
  }, [activePage]);

  useEffect(() => {
    const interval = setInterval(() => fetchData(activePage), 5000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [activePage]);

  const handleNextPage = () => {
    setActivePage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setActivePage(prevPage => prevPage - 1);
  };

  const calculateIndex = (index) => {
    return (activePage - 1) * itemsPerPage + index + 1;
  };

  // Sort
  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    fetchSortedData(field);
  };

  // Search
  const handleSearch = () => {
    if (!searchType || !searchValue) {
      toast.error('Type and value are required for search');
      return;
    }
    fetchSearchData();
  };

  return (
    <div className='mx-[10%] pb-10'>
      <div className='flex mb-3 justify-end'>
        <div className='flex items-center'>
          <input
            className='px-5 py-2 border border-[#b1b1b1] rounded-xl'
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>
            <IoMdSearch className='w-[30px] h-[30px] ml-2'/>
          </button>
        </div>
        <select 
          className="filter-area border-[#b2b2b2] border rounded-md px-2 ml-3" 
          id="filter-select" 
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select a field</option>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="brightness">Light</option>
        </select>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>
                <div className='flex justify-between items-center'>
                  TEMPERATURE 
                  <button className='bg-white rounded-lg hover:bg-green-400 text-black px-2 py-1' onClick={() => handleSort('temperature')}>
                    <FaSort />
                  </button>
                </div>
              </th>
              <th>
                <div className='flex justify-between items-center'>
                  HUMIDITY 
                  <button className='bg-white rounded-lg hover:bg-green-400 text-black px-2 py-1' onClick={() => handleSort('humidity')}>
                    <FaSort />
                  </button>
                </div>
              </th>
              <th>
                <div className='flex justify-between items-center'>
                  LIGHT 
                  <button className='bg-white rounded-lg hover:bg-green-400 text-black px-2 py-1' onClick={() => handleSort('brightness')}>
                    <FaSort />
                  </button>
                </div>
              </th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((sensor, index) => (
              <tr key={index}>
                <td>{calculateIndex(index)}</td>
                <td>{sensor.temperature} °C</td>
                <td>{sensor.humidity} %</td>
                <td>{sensor.brightness} Lux</td>
                <td>{format(new Date(sensor.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="absolute bottom-2 right-[10%]">
          <button className=' bg-sky-400 px-5 py-2 rounded-lg text-white hover:bg-black cursor-pointer' onClick={handlePrevPage} disabled={activePage === 1}>
            <GrFormPrevious />
          </button>
          <span className='mx-2'>Page {activePage}</span>
          <button className=' bg-sky-400 px-5 py-2 rounded-lg text-white hover:bg-black cursor-pointer' onClick={handleNextPage}>
            <GrFormNext />
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Datasensor;
