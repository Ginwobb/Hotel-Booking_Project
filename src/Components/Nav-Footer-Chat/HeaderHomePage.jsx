import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import Login from "../Login-Register-Account/Login";
import Register from "../Login-Register-Account/Register";

const HeaderHomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div>
      <div
        className="w-full flex items-center text-white"
        style={{
          position: "absolute",
          top: -30,
          left: 0,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.01)",
        }}
      >
        <img
          src={travellogo}
          alt="Travel Logo"
          className="ml-4"
          style={{
            width: "150px",
            zIndex: 3,
          }}
        />

        <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
          <a href="#booking" className="hover:text-gray-300">
            Booking
          </a>
          <a href="#promotion" className="hover:text-gray-300">
            Travel Promotion
          </a>
          <a href="#contact" className="hover:text-gray-300">
            Contact Us
          </a>

          {/* Wrapper for Login and Register */}
          <div className="relative group">
            <a
              href="#login"
              className="hover:text-gray-300"
              onClick={() => {
                setIsLoginModalOpen(true);
              }}
            >
              Login
            </a>
            {/* Register Dropdown */}
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white bg-opacity-75 border border-gray-300 rounded-lg p-2">
              <a
                href="#register"
                className="block hover:text-gray-300 text-center text-black rounded p-2"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register
              </a>
            </div>
          </div>
        </nav>

        <div className="flex items-center space-x-4 mr-4">
          <div className="rounded-full border border-gray-500 cursor-pointer hover:bg-gray-200 transition p-2">
            🔍
          </div>
          <span className="text-xs uppercase tracking-wider">
            Hello, Guest!
          </span>
        </div>
      </div>

      {isLoginModalOpen && <Login setIsLoginModalOpen={setIsLoginModalOpen} />}
      {isRegisterModalOpen && (
        <Register setIsRegisterModalOpen={setIsRegisterModalOpen} />
      )}
    </div>
  );
};

export default HeaderHomePage;