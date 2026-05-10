import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_HOST = API_BASE.replace(/\/api\/?$/, "");

function resolveImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${API_HOST}${url}`;
  return `${API_HOST}/${url}`;
}

function Listings() {
  const {
    properties,
    loading,
    error,
    fetchListingProperties,
    currentPage,
    totalCount,
    limit,
  } = useContext(PropertyContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    search: "",
    city: "",
    type: "",
    min_price: "",
    max_price: "",
    beds: "",
  });

  const getFiltersFromURL = () => ({
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    beds: searchParams.get("beds") || "",
  });

  useEffect(() => {
    const filters = getFiltersFromURL();
    setForm(filters);
    fetchListingProperties(1, filters);
  }, [searchParams]);

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = () => {
    const params = {};
    if (form.search) params.search = form.search;
    if (form.city) params.city = form.city;
    if (form.type) params.type = form.type;
    if (form.min_price) params.min_price = form.min_price;
    if (form.max_price) params.max_price = form.max_price;
    if (form.beds) params.beds = form.beds;

    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = Object.fromEntries([...searchParams.entries()]);
    if (page > 1) params.page = page;
    else delete params.page;

    setSearchParams(params);
    fetchListingProperties(page, getFiltersFromURL());
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-4xl bg-white p-6 shadow-xl border border-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">
              Find Property
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Discover your next home with smart filters and curated listings.
            </h1>
          </div>
          <button
            onClick={handleSearchSubmit}
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-900 transition"
          >
            Search
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <input
            value={form.search}
            onChange={(e) => handleInput("search", e.target.value)}
            placeholder="Enter your address"
            className="col-span-2 rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <select
            value={form.type}
            onChange={(e) => handleInput("type", e.target.value)}
            className="rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Buy / Rent</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <select
            value={form.beds}
            onChange={(e) => handleInput("beds", e.target.value)}
            className="rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Beds</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4+ Beds</option>
          </select>
          <select
            value={form.min_price}
            onChange={(e) => handleInput("min_price", e.target.value)}
            className="rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Min price</option>
            <option value="50000">50k</option>
            <option value="100000">100k</option>
            <option value="200000">200k</option>
          </select>
          <select
            value={form.max_price}
            onChange={(e) => handleInput("max_price", e.target.value)}
            className="rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Max price</option>
            <option value="200000">200k</option>
            <option value="400000">400k</option>
            <option value="600000">600k</option>
            <option value="1000000">1M+</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-500">
          {form.search && <span className="rounded-full bg-slate-100 px-4 py-2">Address: {form.search}</span>}
          {form.city && <span className="rounded-full bg-slate-100 px-4 py-2">City: {form.city}</span>}
          {form.type && <span className="rounded-full bg-slate-100 px-4 py-2">Type: {form.type}</span>}
          {form.beds && <span className="rounded-full bg-slate-100 px-4 py-2">Beds: {form.beds}</span>}
          {form.min_price && <span className="rounded-full bg-slate-100 px-4 py-2">Min: {form.min_price}</span>}
          {form.max_price && <span className="rounded-full bg-slate-100 px-4 py-2">Max: {form.max_price}</span>}
        </div>
      </div>

      <section className="mt-10 flex justify-center items-center">
        <img
          src="/Relasto design (1)/google.png"
          alt="Google Map"
          className="w-[100%] h-[500px] object-cover"
        />
      </section>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => {
          const imageUrl = resolveImageUrl(property.primary_image);
          return (
            <div key={property.id} className="overflow-hidden rounded-4xl bg-white shadow-xl border border-slate-200">
              <div className="relative h-64 bg-slate-100">
                {imageUrl ? (
                  <img src={imageUrl} alt={property.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">No image available</div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{property.address || property.city || "Unknown location"}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{property.title}</h3>
                  </div>
                  <div className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">For Sale</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-500">
                  <div className="rounded-3xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">Beds</p>
                    <p>{property.features?.find((f) => f.key.toLowerCase().includes("bed"))?.value || "3"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">Baths</p>
                    <p>{property.features?.find((f) => f.key.toLowerCase().includes("bath"))?.value || "2"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">Agent</p>
                    <p>{property.agent?.username || "Relasto"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-xl font-bold text-slate-900">Rs {property.price?.toLocaleString?.() ?? property.price}</p>
                  </div>
                  <button onClick={() => navigate(`/property/${property.slug}`)} className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900 transition">View Details</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`h-11 min-w-11 rounded-full border px-4 text-sm font-semibold transition ${currentPage === i + 1 ? "border-black bg-black text-white" : "border-slate-200 bg-white text-slate-700"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Listings;
