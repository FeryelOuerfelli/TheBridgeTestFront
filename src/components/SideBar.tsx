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
      } fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:block md:h-screen transition-all duration-300`}
    >
      <div
        className={`bg-white h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: sidebarOpen ? '16rem' : '5rem' }}
      >
        <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
          {sidebarOpen ? (
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          ) : (
            <span className="text-2xl">☰</span> // Hamburger icon
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white md:hidden"
          >
            &times;
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-3 hover:bg-gray-200 text-gray-700"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                {sidebarOpen && 'Dashboard'}
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="flex items-center px-4 py-3 hover:bg-gray-200 text-gray-700"
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                {sidebarOpen && 'Manage Courses'}
              </Link>
            </li>
            <li>
              <Link
                to="/add-course"
                className="flex items-center px-4 py-3 hover:bg-gray-200 text-gray-700"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {sidebarOpen && 'Add Course'}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center px-4 py-3 hover:bg-gray-200 text-gray-700"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                {sidebarOpen && 'Settings'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
