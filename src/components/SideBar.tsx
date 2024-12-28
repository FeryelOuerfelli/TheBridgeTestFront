import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } fixed inset-0 z-40  bg-gradient-to-b from-pink-600 via-pink-700 to-pink-800 md:block md:h-screen transition-all duration-300`}
    >
      <div
        className={`h-full shadow-lg transform transition-transform duration-300 ease-in-out  bg-gradient-to-b from-pink-600 via-pink-700 to-pink-800`}
        style={{ width: sidebarOpen ? '16rem' : '5rem' }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center p-4">
          {sidebarOpen ? (
            <img
              src="/src/images/LogoBridge.png" 
              alt="Logo"
              className="w-80 h-20 object-contain"
            />
          ) : (
            <img
              src="/src/images/LogoBridgemini.png" 
              alt="Mini Logo"
              className="w-10 h-10 object-contain"
            />
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 hover:bg-pink-700 text-white"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 hover:bg-pink-700 text-white"
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                {sidebarOpen && <span>Manage Courses</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/landing"
                className="flex items-center px-4 py-3 hover:bg-pink-700 text-white"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {sidebarOpen && <span>Landing</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center px-4 py-3 hover:bg-pink-700 text-white"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                {sidebarOpen && <span>Contact</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Toggle Button */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-pink-700 text-white rounded-md"
          >
            {sidebarOpen ? 'Hide' : '☰'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
