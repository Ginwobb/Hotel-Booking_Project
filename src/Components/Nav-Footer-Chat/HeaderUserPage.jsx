import React, { useState } from 'react';
import travellogo from '../../assets/TRAVELHOMELOGO-USER.png';
import Login from '../Login-Register-Account/Login';
import Register from '../Login-Register-Account/Register';

const HeaderUserPage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div>
            <div
                className="w-full flex items-center text-white"
                style={{
                    position: 'absolute',
                    top: -30,
                    left: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                }}
            >
                <img
                    src={travellogo}
                    alt="Travel Logo"
                    className="ml-4"
                    style={{
                        width: '150px',
                        zIndex: 3,
                    }}
                />

                <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
                    <a href="#booking" className="hover:text-gray-300 text-black">Booking</a>
                    <a href="#promotion" className="hover:text-gray-300 text-black ">Travel Promotion</a>
                    <a href="#contact" className="hover:text-gray-300 text-black">Contact Us</a>
                    <a href="#login" className="hover:text-gray-300 text-black" onClick={() => setIsLoginModalOpen(true)}>Login</a>
                    <a href="#register" className="text-black hover:text-gray-300" onClick={() => setIsRegisterModalOpen(true)}>Register</a>
                </nav>

                <div className="flex items-center space-x-4 mr-4">
                    <div className="rounded-full border border-gray-500 cursor-pointer hover:bg-gray-200 transition p-2">
                        🔍
                    </div>
                    <span className=" text-black text-xs uppercase tracking-wider">Hello, Guest!</span>
                </div>
            </div>

            {isLoginModalOpen && <Login onClose={() => setIsLoginModalOpen(false)} />}
            {isRegisterModalOpen && <Register onClose={() => setIsRegisterModalOpen(false)} />}
        </div>
    );
};

export default HeaderUserPage;