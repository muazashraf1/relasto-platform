import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaHome, FaSmile } from "react-icons/fa";

function AppointmentSection() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5">

        {/* LEFT BOX */}
        <div className="bg-[#ecd0bf] rounded-[22px] px-10 py-9 h-[270px] flex flex-col justify-center">
          <h1 className="text-[32px] leading-[42px] font-bold text-black max-w-[420px]">
            Simple & easy way to find your dream Appointment
          </h1>

          <p className="text-[15px] leading-[26px] text-[#555] mt-4 max-w-[390px]">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>

          <button className="mt-7 bg-black text-white text-[14px] font-medium w-[120px] h-[44px] rounded-xl">
            Get Started
          </button>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 gap-5">

          {/* CARD 1 */}
          <div className="bg-[#f3e7e1] rounded-[22px] p-7 h-[125px] flex flex-col justify-between">
            <div className="text-[#ff6b1a] text-[20px]">↻</div>

            <h2 className="text-[18px] leading-[26px] font-bold text-black">
              Search
              <br />
              your location
            </h2>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#f3e7e1] rounded-[22px] p-7 h-[125px] flex flex-col justify-between">
            <div className="text-[#ff6b1a] text-[20px]">◉</div>

            <h2 className="text-[18px] leading-[26px] font-bold text-black">
              Visit
              <br />
              Appointment
            </h2>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#f3e7e1] rounded-[22px] p-7 h-[125px] flex flex-col justify-between">
            <div className="text-[#ff6b1a] text-[20px]">◔</div>

            <h2 className="text-[18px] leading-[26px] font-bold text-black">
              Get your
              <br />
              dream house
            </h2>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#f3e7e1] rounded-[22px] p-7 h-[125px] flex flex-col justify-between">
            <div className="text-[#ff6b1a] text-[20px]">☻</div>

            <h2 className="text-[18px] leading-[26px] font-bold text-black">
              Enjoy your
              <br />
              Appointment
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AppointmentSection;
