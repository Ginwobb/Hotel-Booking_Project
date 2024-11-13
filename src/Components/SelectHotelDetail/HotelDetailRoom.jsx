import React from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";

function HotelDetailRoom({ rooms }) {
  const navigate = useNavigate();
  const actionSetSelectedRoom = useHotelStore(
    (state) => state.actionSetSelectedRoom
  );
  const actionClearSelectedRooms = useHotelStore(
    (state) => state.actionClearSelectedRooms
  );

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available at this time.</div>;
  }

  const formatFacilityName = (key) => {
    return key
      .replace(/is|([A-Z])/g, " $1")
      .trim()
      .replace(/  +/g, " ");
  };

  const handleBookNow = (room) => {
    // actionClearSelectedRooms()
    actionSetSelectedRoom(room);
    navigate("/bookinghotel-detail-payment");
  };

  return (
    <div
      style={{
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
      }}
    >
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "600",
          marginBottom: "16px",
          color: "#413831",
        }}
      >
        Rooms
      </h3>
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            position: "relative",
            display: "flex",
            backgroundColor: "#fff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e5a478",
            marginBottom: "16px",
          }}
        >
          <img
            src={
              room.images && room.images.length > 0
                ? room.images[0].img
                : "/default-room.jpg"
            }
            alt={room.type}
            style={{
              width: "8rem",
              height: "6rem",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "16px",
            }}
          />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#543310",
                }}
              >
                {room.type}
              </h4>
              <div className="text-[#543310] flex items-center ">
                <div className="w-[100px]">Facilities :</div>
                <div className="h-full flex flex-wrap items-center">
                  {Object.entries(room.facilitiesRoom || {})
                    .filter(([key, value]) => value === true)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="text-[#543310] m-1 px-3 py-1 bg-orange-100 shadow-md rounded-lg"
                      >
                        {formatFacilityName(key)}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-[60px]">
              <p style={{ fontWeight: "600", color: "#543310" }}>Guests</p>
              <p style={{ fontSize: "0.875rem", color: "#6b6b6b" }}>
                {room.recommendPeople || "Not specified"} Adults
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p style={{ fontWeight: "600", color: "#543310" }}>Room</p>
              <p style={{ fontSize: "0.875rem", color: "#6b6b6b" }}>
                {room.status || "Not specified"}
              </p>
            </div>
          </div>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#f08a4b",
              marginLeft: "16px",
              whiteSpace: "nowrap",
            }}
          >
            THB {room.price || "N/A"}
          </span>
          <button
            className="absolute right-4 bottom-4 bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white font-bold py-2 px-4 rounded-full text-base shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
            onClick={() => handleBookNow(room)}
          >
            BOOK NOW
          </button>
        </div>
      ))}
    </div>
  );
}

export default HotelDetailRoom;
