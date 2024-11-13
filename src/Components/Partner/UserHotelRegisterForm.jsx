import React, { useEffect, useState } from "react";
import AddressMap from "./AddressMap";
import SearchLocation from "../GoogleApi/SearchLocation";
import Swal from "sweetalert2";
import FormErrorIcon from '../../assets/ErrorToast1.gif'

function UserHotelRegisterForm(props) {
  const { setAllFormData, hotelData, setPage } = props;
  const [input, setInput] = useState({
    name: "",
    detail: "",
    address: "",
    lat: "",
    lng: "",
    star: 1,
    checkinTime: "",
    checkoutTime: "",
    phone: "",
    webPage: "",
    file: null,
    facilitiesHotel: {
      isRoomService: false,
      isReception: false,
      isFitness: false,
      isParking: false,
      isEVCharging: false,
      isSwimmingPool: false,
      isRestaurant: false,
      isBreakfast: false,
      isChildren: false,
      isPetFriendly: false,
      isElevator: false,
    },
  });
  const [errMsg, setErrMsg] = useState({
    name: '',
    detail: '',
    address: '',
    latlng: '',
    checkinTime: '',
    checkoutTime: '',
    phone: '',
    webPage: '',
    file: null,
    overall: ''
  });
  useEffect(() => {
    if (hotelData) {
      setInput((prv) => ({
        ...prv,
        name: hotelData.name,
        detail: hotelData.detail,
        address: hotelData.address,
        lat: hotelData.lat,
        lng: hotelData.lng,
        star: hotelData.star,
        checkinTime: hotelData.checkinTime,
        checkoutTime: hotelData.checkoutTime,
        phone: hotelData.phone,
        webPage: hotelData.webPage,
        file: hotelData.file,
        facilitiesHotel: {
          isRoomService: hotelData.facilitiesHotel.isRoomService,
          isReception: hotelData.facilitiesHotel.isReception,
          isFitness: hotelData.facilitiesHotel.isFitness,
          isParking: hotelData.facilitiesHotel.isParking,
          isEVCharging: hotelData.facilitiesHotel.isEVCharging,
          isSwimmingPool: hotelData.facilitiesHotel.isSwimmingPool,
          isRestaurant: hotelData.facilitiesHotel.isRestaurant,
          isBreakfast: hotelData.facilitiesHotel.isBreakfast,
          isChildren: hotelData.facilitiesHotel.isChildren,
          isPetFriendly: hotelData.facilitiesHotel.isPetFriendly,
          isElevator: hotelData.facilitiesHotel.isElevator,
        },
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    console.log(input)
    e.preventDefault();
    try {
      validator();
      setAllFormData((prv) => ({ ...prv, hotel: input }));
      setPage((prv) => prv + 1);
    } catch (err) {
        console.log(err)
      const errMsg = err.response?.data?.message || err.message;
      setErrMsg(prv => ({ ...prv, overall: errMsg }));
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorIcon}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg.overall}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    }
  };
  const handleChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlCheckBox = (e) => {
    setInput((prv) => ({
      ...prv,
      facilitiesHotel: {
        ...prv.facilitiesHotel,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, file: e.target.files[0] }));
  };

  const hdlLocationSelect = (location) => {
    setInput((prv) => ({
      ...prv,
      lat: location.lat,
      lng: location.lng,
      address: location.address,
    }));
  };

  const validator = () => {
    const err = {
      name: '',
      detail: '',
      address: '',
      latlng: '',
      checkinTime: '',
      checkoutTime: '',
      phone: '',
      webPage: '',
      file: '',
      overall : ''
    }
    if (!input.name) {
      err.name = 'Name is required'
    }
    if (!input.detail) {
      err.detail = 'Detail is required'
    }
    if (!input.address) {
      err.address = 'Address is required'
    }
    if (!input.lat || !input.lng) {
      err.latlng = 'Please pin you map'
    }
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!input.checkinTime) {
      err.checkinTime = 'Check-in Time is required'
    }
    if (!input.checkoutTime) {
      err.checkoutTime = 'Check-out Time is required'
    }
    if (!timePattern.test(input.checkinTime)) {
      err.checkinTime = 'Check-in Time should be in HH:MM form'
    }
    if (!timePattern.test(input.checkoutTime)) {
      err.checkoutTime = 'Check-out time should be in HH:MM form'
    }
    const phonePattern = /^\d{10}$/
    if (!input.phone) {
      err.phone = 'Phone number is required'
    }
    if (!phonePattern.test(input.phone)) {
      err.phone = 'Phone number should be 10 digits'
    }
    if (!input.webPage) {
      err.webPage = 'Web Page is required'
    }
    if (!input.file) {
      err.file = 'Image is required'
    }
    setErrMsg(err)
    if (err.name || err.address || err.checkinTime || err.checkoutTime || err.detail || err.file || err.latlng || err.phone || err.webPage) {
      throw new Error("Please fill all info")
    }

  }
  return (
    <form
      className="bg-cream-gradient text-[#543310] p-8 rounded-lg shadow-md max-w-4xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-center mb-8">
        Hotel Partner Registration
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center col-span-2 relative">
          <input
            type="file"
            onChange={hdlFileChange}
            id="input-file"
            className="hidden"
          />
          <div
            className="w-[400px] h-[320px] bg-opacity-75 opacity-0 hover:opacity-100 absolute text-white flex items-center justify-center text-2xl rounded-lg"
            onClick={() => document.getElementById("input-file").click()}
          >
            Click
          </div>
          <img
            src={
              input.file
                ? URL.createObjectURL(input.file)
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            className="w-[400px] h-[320px] object-cover rounded-lg"
          />
          <p className="text-sm text-red-500">{errMsg.file}</p>
        </div>
        <div className="col-span-2">
          <label className="block  mb-2">Hotel Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Hotel Name"
          />
          <p className="text-sm text-red-500">{errMsg.name}</p>
        </div>

        <div className="col-span-2">
          <label className="block  mb-2">Detail</label>
          <textarea
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="detail"
            value={input.detail}
            placeholder="detail"
            onChange={handleChange}
            rows={input.detail.split("\n").length}
          ></textarea>
          <p className="text-sm text-red-500">{errMsg.detail}</p>
        </div>
        <div>
          <label className="block  mb-2">Check-in Time</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="checkinTime"
            value={input.checkinTime}
            onChange={handleChange}
            placeholder="HH:MM"
          />
          <p className="text-sm text-red-500">{errMsg.checkinTime}</p>
        </div>
        <div>
          <label className="block  mb-2">Check-out Time</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="checkoutTime"
            value={input.checkoutTime}
            onChange={handleChange}
            placeholder="HH:MM"
          />
          <p className="text-sm text-red-500">{errMsg.checkoutTime}</p>
        </div>
        <div>
          <label className="block mb-2">Star</label>
          <select
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-amber-500"
            value={input.star}
            name="star"
            onChange={handleChange}
          >
            <option value={1}>★</option>
            <option value={2}>★★</option>
            <option value={3}>★★★</option>
            <option value={4}>★★★★</option>
            <option value={5}>★★★★★</option>
          </select><p className="text-sm text-red-500">{errMsg.star}</p>
        </div>

        <div>
          <label className="block  mb-2">Phone</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
            name="phone"
            value={input.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <p className="text-sm text-red-500">{errMsg.phone}</p>
        </div>
        <div>
          <label className="block  mb-2">Web Page</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
            name="webPage"
            value={input.webPage}
            onChange={handleChange}
            placeholder="Web Page"
          />
          <p className="text-sm text-red-500">{errMsg.webPage}</p>
        </div>

        {/* Facility */}
        <div className="col-span-2 flex">
          <div className="w-1/4 flex flex-col">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isRoomService"
                value={input.facilitiesHotel.isRoomService}
                checked={input.facilitiesHotel.isRoomService}
              />
              <p>Room service</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isReception"
                value={input.facilitiesHotel.isReception}
                checked={input.facilitiesHotel.isReception}
              />
              <p>Reception</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isFitness"
                value={input.facilitiesHotel.isFitness}
                checked={input.facilitiesHotel.isFitness}
              />
              <p>Fitness</p>
            </label>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isEVCharging"
                value={input.facilitiesHotel.isEVCharging}
                checked={input.facilitiesHotel.isEVCharging}
              />
              <p>EVCharging</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isSwimmingPool"
                value={input.facilitiesHotel.isSwimmingPool}
                checked={input.facilitiesHotel.isSwimmingPool}
              />
              <p>Swimming Pool</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isRestaurant"
                value={input.facilitiesHotel.isRestaurant}
                checked={input.facilitiesHotel.isRestaurant}
              />
              <p>Restaurant</p>
            </label>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isParking"
                value={input.facilitiesHotel.isParking}
                checked={input.facilitiesHotel.isParking}
              />
              <p>Parking</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isBreakfast"
                value={input.facilitiesHotel.isBreakfast}
                checked={input.facilitiesHotel.isBreakfast}
              />
              <p>Breakfast</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isChildren"
                value={input.facilitiesHotel.isChildren}
                checked={input.facilitiesHotel.isChildren}
              />
              <p>Children</p>
            </label>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isPetFriendly"
                value={input.facilitiesHotel.isPetFriendly}
                checked={input.facilitiesHotel.isPetFriendly}
              />
              <p>Pet Friendly</p>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                onChange={hdlCheckBox}
                name="isElevator"
                value={input.facilitiesHotel.isElevator}
                checked={input.facilitiesHotel.isElevator}
              />
              <p>Elevator</p>
            </label>
          </div>
        </div>
        <div className="col-span-2">


          <div className="w-full">
            <label className="block  mb-2">Address</label>
            <div className="flex items-center gap-2 w-full">
              <div className="flex flex-col">

                <SearchLocation onSelectLocation={hdlLocationSelect} />
                <p className="text-sm text-red-500">{errMsg.latlng}</p>
              </div>
              <div className="flex flex-col w-full ">
                <input
                  type="text"
                  className="w-full p-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 "
                  name="address"
                  value={input.address}
                  onChange={handleChange}
                  placeholder="please enter your address"
                />
                <p className="text-sm text-red-500">{errMsg.address}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="block  mb-2">Map</p>
            <AddressMap
              lat={parseFloat(input.lat)}
              lng={parseFloat(input.lng)}
              onLocationChange={hdlLocationSelect}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-sm text-red-500">{errMsg.overall}</p>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/4 py-2 px-8 bg-gray-300 rounded-md hover:bg-orange-200 hover:text-black"
            onClick={() => {
              setAllFormData((prv) => ({ ...prv, hotel: input }));
              setPage((prv) => prv - 1);
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="w-3/4 bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
          >
            NEXT
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserHotelRegisterForm;
