import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    const storedActivePage = localStorage.getItem('activePage');
    if (storedActivePage) {
      setActivePage(storedActivePage);
    }
  }, []);

  const handlePageClick = (page) => {
    setActivePage(page);
    localStorage.setItem('activePage', page);
  };

  return (
    <>
      <div className="header mx-[10%]">
        <div className='flex justify-evenly items-center'>
          <div>
            <Link
              className={`title ${activePage === 'Dashboard' ? 'active' : ''} `}
              to="./Dashboard"
              onClick={() => handlePageClick('Dashboard')}
            >
              IOT
            </Link>
          </div>
          <div>
            <Link
              className={`navi ${activePage === 'Dashboard' ? 'active' : ''}`}
              to="./Dashboard"
              onClick={() => handlePageClick('Dashboard')}
            >
              Dashboard
            </Link>
            <Link
              className={`navi ${activePage === 'Datasensor' ? 'active' : ''}`}
              to="./Datasensor"
              onClick={() => handlePageClick('Datasensor')}
            >
              Data Sensor
            </Link>
            <Link
              className={`navi ${activePage === 'History' ? 'active' : ''}`}
              to="./History"
              onClick={() => handlePageClick('History')}
            >
              History
            </Link>
            <Link
              className={`navi ${activePage === 'Profile' ? 'active' : ''}`}
              to="./Profile"
              onClick={() => handlePageClick('Profile')}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
