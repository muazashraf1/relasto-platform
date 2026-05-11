import React, { useContext, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const PropertyList = () => {
    const { properties, fetchHomeProperties, loading, error } =
        useContext(PropertyContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchHomeProperties();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading properties...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    if (properties.length === 0) {
        return (
            <div className="p-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Featured Properties</h2>

                </div>
                <p className="text-center">Not property available</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Featured Properties</h2>

                <button
                    onClick={() => navigate("/property-listing")}
                    className="text-sm border  font-medium text-white px-7 py-3.5 bg-amber-700 rounded-2xl "
                >
                    Explore More →
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                    >


                        <div className="h-52 w-full">
                            <img
                                src={
                                    property.primary_image
                                }
                                alt="property"
                                className="w-full h-full object-cover"
                            />
                        </div>


                        <div className="p-4 space-y-3">


                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                🏢 {property.address}
                            </p>


                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                {property.features?.length > 0 ? (
                                    property.features.slice(0, 3).map((f, i) => (
                                        <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                                            {f.key}: {f.value}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400">No features</span>
                                )}
                            </div>


                            <div className="flex justify-between items-center pt-2">

                                <button
                                    onClick={() =>
                                        navigate(`/property/${property.slug}`)
                                    }
                                    className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
                                >
                                    View Details
                                </button>

                                <p className="text-lg font-bold">
                                    $ {property.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;