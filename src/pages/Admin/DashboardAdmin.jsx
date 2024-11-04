import React from "react";
import booking from "../../assets/booking.png";
import hotel from "../../assets/hotel.png";
import star from "../../assets/star.png";
import user from "../../assets/user.png";

export default function DashboardAdmin() {
  return (
    <>
      <div className="p-8 min-h-screen ">
        <p className="text-2xl font-bold text-[#543310] mb-6">DASHBOARD</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out">
            <div className="flex items-center gap-4">
              <img src={booking} alt="" className="w-16" />
              <span className="text-xl">TOTAL BOOKING</span>
            </div>
          </button>
          <button className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out">
            <div className="flex items-center gap-4">
              <img src={user} alt="" className="w-16" />
              <span className="text-xl">TOTAL USERS</span>
            </div>
          </button>
          <button className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out">
            <div className="flex items-center gap-4">
              <img src={hotel} alt="" className="w-16" />
              <span className="text-xl">TOTAL HOTELS</span>
            </div>
          </button>
          <button className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out">
            <div className="flex items-center gap-4">
              <img src={star} alt="" className="w-16" />
              <span className="text-xl">TOTAL REVIEWS</span>
            </div>
          </button>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg text-center p-6 mb-6">
          <div className="flex space-x-4 justify-around">
            <div className="flex flex-col justify-center items-center rounded-full border-4 border-[#AF8F6F] bg-[#F8F4E1] w-[200px] h-[200px] shadow-md">
              <p className="text-xl font-bold text-[#543310]">TOTAL CHATS</p>
              <p className="text-3xl font-bold text-[#543310]">500</p>
            </div>
            <button className="relative flex flex-col justify-center items-center rounded-full p-6 border-4 border-[#AF8F6F] bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out">
              <p className="text-2xl font-bold ">WAITING CHAT</p>
              <p className="absolute top-8 right-5 transform translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#FF0000] rounded-full border-4 border-[#AF8F6F] bg-[#F8F4E1] p-2">
                40
              </p>
            </button>
          </div>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg text-center p-6">
          <div className="flex space-x-4 justify-around">
            <div className="bg-[#F8F4E1] text-[#543310] font-semibold">
              <p className="text-2xl font-bold ">BOOKING EACH DAY</p>
              <p>IMAGE BAR GRAPH</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}