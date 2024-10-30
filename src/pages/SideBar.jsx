import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      name: "Dashboard",
      link: '/k',
    },
    {
      name: "Suppliers",
      link: '/supplierTable',
    },
    {
      name: "Item",
      link: '/item',
    },
    {
      name: "Purchase Order",
      link: '/purchase-order', 
    }
  ];

  const navigate = useNavigate()

  return (
    <div>
      
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-4 mb-4">Super Admin Page</h1>
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h1 className='self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-4 mb-4 mt-24 cursor-pointer' onClick={()=>navigate('/')}>Logout</h1>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
