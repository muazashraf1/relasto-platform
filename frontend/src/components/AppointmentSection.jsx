import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaHome, FaSmile } from "react-icons/fa";

function AppointmentSection() {
  return (
    <section className="bg-[#f8f5f2] py-16 px-6">
      <div className="max-w-7xl mx-auto grid gap-8 xl:grid-cols-[1.4fr_1fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Your next visit starts here
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple & easy way to find your dream appointment
          </h2>
          <p className="max-w-xl text-gray-600 leading-8">
            Search homes, explore agents, and schedule property visits with a clean, modern interface. Relasto helps buyers and agents connect through a dependable real estate workflow.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Search your location</h3>
              <p className="mt-3 text-gray-500">Filter by city, type, and price to find properties that fit your needs.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Request a visit</h3>
              <p className="mt-3 text-gray-500">Send a visit request with preferred dates and detailed property choices.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <FaHome />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Find your dream house</h3>
              <p className="mt-3 text-gray-500">Compare listings, view galleries, and review agent details from one dashboard.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <FaSmile />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Enjoy your appointment</h3>
              <p className="mt-3 text-gray-500">Track request status and finalize visits with a trusted agent network.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80"
            alt="Appointment planning"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default AppointmentSection;
