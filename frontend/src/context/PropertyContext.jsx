import { createContext, useState } from "react";
import {
    getProperties,
    getFilteredProperties,
    getPropertyDetail,
} from "../api/property";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {

  
    const [properties, setProperties] = useState([]);
    const [propertyDetail, setPropertyDetail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);


    const [filters, setFilters] = useState({
        city: "",
        type: "",
        status: "",
        min_price: "",
        max_price: "",
        search: "",
    });

    const fetchHomeProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await getProperties();
            setProperties(res.results.slice(0, 6));

        } catch (err) {
            setError("Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    };

    const fetchListingProperties = async (customPage = 1, customFilters = filters) => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                ...customFilters,
                page: customPage,
            };

            const res = await getFilteredProperties(params);

            setProperties(res.results);
            setTotalCount(res.count);
            setCurrentPage(res.page);
            setLimit(res.limit);

        } catch (err) {
            setError("Failed to fetch listing properties");
        } finally {
            setLoading(false);
        }
    };


    const updateFilters = (newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
        }));
    };

    const resetFilters = () => {
        setFilters({
            city: "",
            type: "",
            status: "",
            min_price: "",
            max_price: "",
            search: "",
        });
    };

  
    const fetchPropertyDetail = async (slug) => {
        try {
            setLoading(true);
            setError(null);

            const res = await getPropertyDetail(slug);

            setPropertyDetail(res);

        } catch (err) {
            setError("Failed to fetch property detail");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearPropertyDetail = () => {
        setPropertyDetail(null);
    };

    return (
        <PropertyContext.Provider
            value={{

                properties,
                propertyDetail,
                loading,
                error,

                totalCount,
                currentPage,
                limit,

                filters,
                updateFilters,
                resetFilters,

    
                fetchHomeProperties,
                fetchListingProperties,
                fetchPropertyDetail,
                clearPropertyDetail, 
            }}
        >
            {children}
        </PropertyContext.Provider>
    );
};