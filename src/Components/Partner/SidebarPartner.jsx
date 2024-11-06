import React from "react";
import TRAVELHOMELOGOUSER from "../../assets/TRAVELHOMELOGO-USER.png";
import { Link } from "react-router-dom";

export default function SidebarPartner() {
  return (
    <>
      <div className="bg-[#543310] h-screen flex flex-col rounded-lg">
        <div className="text-center">
          <Link to={"dashboard"}>
            <img
              src={TRAVELHOMELOGOUSER}
              alt=""
              className="w-[40%] mx-auto mb-4"
            />
          </Link>
          <div action="" className="flex flex-col space-y-4 items-center">
            <Link
              to={"bookingDetailPartner"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out"
            >
              BOOKING
            </Link>
            <Link
              to={"hotelDetailAdmin"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              HOTELS
            </Link>
            <Link
              to={"reviewDetailPartner"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              REVIEWS
            </Link>
            <button className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out ">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
