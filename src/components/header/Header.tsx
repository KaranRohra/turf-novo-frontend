"use client";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("John Doe"); // Replace with actual user name logic
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-green-400 to-green-600 p-4 flex items-center justify-between h-auto sm:h-16 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="text-white text-2xl font-bold">TurfNovo</div>
        <div className="hidden sm:flex items-center space-x-4">
          <a href="#" className="text-white hover:text-gray-200 text-lg" onClick={handleMenuItemClick}>
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-200 text-lg" onClick={handleMenuItemClick}>
            About
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-300" />
        <div className="relative sm:hidden" ref={menuRef}>
          <button className="text-white flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isLoggedIn ? userName : "Menu"}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                Home
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                About
              </a>
              {isLoggedIn ? (
                <>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Booking History
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Logout
                  </a>
                </>
              ) : (
                <a onClick={handleLogin} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                  Log in
                </a>
              )}
            </div>
          )}
        </div>
        <div className="hidden sm:flex items-center space-x-4" ref={menuRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button className="text-white flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {userName}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Booking History
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a onClick={handleLogin} className="text-green-600 bg-white hover:bg-gray-100 px-6 py-2 rounded-full transition duration-300 cursor-pointer">
              Log in
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
