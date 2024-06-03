import React, { useState, useEffect } from 'react';
import '../css/History.css';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchDate, setSearchDate] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [typeQuery, setTypeQuery] = useState(''); // Thêm trạng thái này để theo dõi type sau khi nhấn nút tìm kiếm
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (typeQuery) {
      fetchSearchByType(typeQuery);
    } else {
      fetchHistory();
    }
  }, [activePage, typeQuery]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/getActionHistory?page=${activePage}&pageSize=${itemsPerPage}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchSearchByDate = async (date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await axios.get(`http://localhost:8081/searchByDate?date=${formattedDate}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error searching by date:', error);
      toast.error('Error searching by date');
    }
  };

  const fetchSearchByType = async (type) => {
    try {
      const response = await axios.get(`http://localhost:8081/searchDevice?type=${type}&page=${activePage}&pageSize=${itemsPerPage}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error(`Error searching by ${type}:`, error);
      toast.error(`Error searching by ${type}`);
    }
  };

  const handleNextPage = () => {
    setActivePage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setActivePage(prevPage => prevPage - 1);
  };

  const calculateIndex = (index) => {
    return (activePage - 1) * itemsPerPage + index + 1;
  };

  const handleDateChange = (e) => {
    setSearchDate(new Date(e.target.value));
  };

  const handleSearch = async () => {
    if (searchDate) {
      await fetchSearchByDate(searchDate);
    } else {
      toast.error('Please select a date');
    }
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleTypeSearch = () => {
    setTypeQuery(searchType);
    setActivePage(1); // Reset page to 1 when type changes
  };

  return (
    <>
      <div className='mx-[10%] pb-10'>
        <div className='flex justify-between mb-5'>
          <div className='flex items-center'>
            <input
              className='px-5 py-2 border border-[black] rounded-xl'
              type="date"
              value={searchDate ? format(searchDate, 'yyyy-MM-dd') : ''} // Đặt giá trị của input là ngày định dạng yyyy-MM-dd nếu có
              onChange={handleDateChange} // Thêm hàm xử lý sự kiện khi giá trị thay đổi
            />
            <button onClick={handleSearch}>
              <IoMdSearch className='w-[30px] h-[30px] ml-2' />
            </button>
          </div>
          <div className='flex justify-center items-center'>
            <select
              className="filter-area border-[#b2b2b2] border rounded-md px-2 ml-3"
              id="filter-select"
              value={searchType}
              onChange={handleTypeChange}
            >
              <option value="">All</option>
              <option value="led">Led</option>
              <option value="fan">Fan</option>
            </select>
            <button onClick={handleTypeSearch}>
              <IoMdSearch className='w-[30px] h-[30px] ml-2' />
            </button>
          </div>

          <div className='flex justify-center items-center'>
            <select
              className="filter-area border-[#b2b2b2] border rounded-md px-2 ml-3"
              id="filter-select"
              value={searchType}
              onChange={handleTypeChange}
            >
              <option value="">All</option>
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
            <button onClick={handleTypeSearch}>
              <IoMdSearch className='w-[30px] h-[30px] ml-2' />
            </button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>DEVICE</th>
                <th>ACTION</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={index}>
                  <td>{calculateIndex(index)}</td>
                  <td>{item.device}</td>
                  <td>{item.mode} </td>
                  <td>{format(new Date(item.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-2 right-[10%]">
          <button className=' bg-sky-400 px-5 py-2 rounded-lg text-white hover:bg-black cursor-pointer' onClick={handlePrevPage} disabled={activePage === 1}>
            <GrFormPrevious />
          </button>
          <span className='mx-2'>Page {activePage}</span>
          <button className=' bg-sky-400 px-5 py-2 rounded-lg text-white hover:bg-black cursor-pointer' onClick={handleNextPage}>
            <GrFormNext />
          </button>
        </div>

        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};

export default History;
