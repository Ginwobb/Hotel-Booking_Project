import React, { useEffect, useState } from "react";
import booking from "../../assets/booking.png";
import hotel from "../../assets/hotel.png";
import star from "../../assets/star.png";
import user from "../../assets/user.png";
import AllChatAdmin from "../../pages/Admin/AllChatAdmin";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function DashboardAdmin({ }) {
  const { socket, connect } = useAdminStore(useShallow(state => ({
    socket: state.socket,
    connect: state.connect
  })))
    const [ChatBoxList , setChatBoxList] = useState([])
  useEffect(() => {
    connect()
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('adminJoinComplete',(allLastMessage)=>{
        setChatBoxList(allLastMessage)
      })
      socket.emit('adminJoin')
      socket.on('userMessage',(data)=>{
        const newData = data.data
      })
    }
    return (() => {
      if (socket) socket.off('userMessage')
    })
  }, [socket])
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      {chatOpen && <AllChatAdmin setChatOpen={setChatOpen} />}  
      <div className="p-8 min-h-screen ">
        <p className="text-2xl font-bold text-[#543310] mb-6">DASHBOARD</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="bookingDetailAdmin"
            className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={booking} alt="" className="w-16" />
              <span className="text-xl">TOTAL BOOKING</span>
            </div>
          </a>
          <a
            href="userDetailAdmin"
            className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={user} alt="" className="w-16" />
              <span className="text-xl">TOTAL USERS</span>
            </div>
          </a>
          <a
            href="hotelDetailAdmin"
            className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={hotel} alt="" className="w-16" />
              <span className="text-xl">TOTAL HOTELS</span>
            </div>
          </a>
          <a
            href="reviewDetailAdmin"
            className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={star} alt="" className="w-16" />
              <span className="text-xl">TOTAL REVIEWS</span>
            </div>
          </a>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg text-center p-6 mb-6">
          <div className="flex space-x-4 justify-around">
            <div className="flex flex-col justify-center items-center rounded-full border-4 border-[#AF8F6F] bg-[#F8F4E1] w-[200px] h-[200px] shadow-md">
              <p className="text-xl font-bold text-[#543310]">TOTAL CHATS</p>
              <p className="text-3xl font-bold text-[#543310]">500</p>
            </div>
            <button
              onClick={() => {
                setChatOpen(true);
              }}
              className="relative flex flex-col justify-center items-center rounded-full p-6 border-4 border-[#AF8F6F] bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
            >
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
