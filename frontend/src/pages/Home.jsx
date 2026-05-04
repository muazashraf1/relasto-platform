

import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import AppointmentSection from "../components/AppointmentSection";
import StatsSection from "../components/StatsSection";
import PropertyList from "../components/PropertyList";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mx-auto max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
              Modern property marketplace
            </span>
            <h2 className="mt-8 text-4xl md:text-5xl font-bold text-slate-900">
              Find beautiful homes, connect with trusted agents, and book visits fast.
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-8">
              Browse verified listings, schedule property visits, and work with local experts who make home buying simple.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900">Verified properties</h3>
              <p className="mt-4 text-gray-500">
                Explore handpicked homes and investment properties with transparent pricing and trusted details.
              </p>
            </div>
            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900">Trusted agents</h3>
              <p className="mt-4 text-gray-500">
                Connect with local agents who provide expert support, market insight, and personalized property matches.
              </p>
            </div>
            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900">Easy visit booking</h3>
              <p className="mt-4 text-gray-500">
                Request property visits directly, manage appointments, and keep everything organized in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-4xl bg-linear-to-r from-slate-900 to-slate-950 p-12 text-white shadow-2xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                Start your journey
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                Ready to find the perfect property?
              </h2>
              <p className="mt-4 text-gray-300">
                Discover homes, meet agents, and schedule visits with a premium experience built for modern buyers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/property-listing"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-orange-600 transition"
              >
                Browse Listings
              </Link>
              <Link
                to="/agents"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Meet Agents
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PropertyList />
      <AppointmentSection />
      <StatsSection />

      <Footer />
    </>
  );
}

export default Home;