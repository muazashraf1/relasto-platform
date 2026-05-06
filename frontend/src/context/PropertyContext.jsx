// import { Children, createContext, useState } from "react";
// import { getFilteredProperties, getProperties, getPropertyDetail } from "../api/property";

// export const PropertyContext = createContext();

// export const PropertyProvider = ({ children }) => {
//     const [properties, setProperties] = useState([]);
//     const [propertyDetail, setPropertyDetail] = useState(null);

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // landing page properties and 6 items 
//     const fetchHomeProperties = async () => {
//         try {
//             setLoading(true)
//             const res = await getProperties()

//             setProperties(res.results.slice(0, 6));
//         } catch (err) {
//             setError("Failed to fetch the properties")
//             console.error(err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     // listing page properties

//     const fetchFilteredProperties = async (params) => {
//         try {
//             setLoading(true)
//             const res = await getFilteredProperties(params)
//             setProperties(res.results)

//             return {
//                 count: res.count,
//                 page: res.page,
//                 limit: res.limit
//             };
//         } catch (err) {
//             setError("Failed to fetch filtered properties");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }


//     //property detail

//     const fetchPropertyDetail = async (slug) => {
//         try {
//             setLoading(true);

//             const res = await getPropertyDetail(slug);
//             setPropertyDetail(res);
//         } catch (err) {
//             setError("Failed to fetch property detail");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <PropertyContext.Provider value={{ properties, propertyDetail, loading, error, fetchHomeProperties, fetchFilteredProperties, fetchPropertyDetail }}>
//             {children}
//         </PropertyContext.Provider>
//     )

// }



// ===== After listing page for filter and search and pagination


// import { createContext, useState } from "react";
// import {
//     getProperties,
//     getFilteredProperties,
//     getPropertyDetail,
// } from "../api/property";

// export const PropertyContext = createContext();

// export const PropertyProvider = ({ children }) => {

//     // 🔹 STATES
//     const [properties, setProperties] = useState([]);
//     const [propertyDetail, setPropertyDetail] = useState(null);

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // 🔹 PAGINATION STATES (NEW)
//     const [totalCount, setTotalCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [limit, setLimit] = useState(5);

//     // 🔹 FILTER STATES (NEW)
//     const [filters, setFilters] = useState({
//         city: "",
//         type: "",
//         status: "",
//         min_price: "",
//         max_price: "",
//         search: "",
//     });

    // ==============================
    // 🏠 HOME PROPERTIES (same)
    // ==============================
//     const fetchHomeProperties = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const res = await getProperties();

//             setProperties(res.results.slice(0, 6)); // 6 cards

//         } catch (err) {
//             setError("Failed to fetch properties");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ==============================
//     // 📄 LISTING PROPERTIES (NEW CORE)
//     // ==============================
//     const fetchListingProperties = async (customPage = 1, customFilters = filters) => {
//         try {
//             setLoading(true);
//             setError(null);

//             const params = {
//                 ...customFilters,
//                 page: customPage,
//             };

//             const res = await getFilteredProperties(params);

//             setProperties(res.results);
//             setTotalCount(res.count);
//             setCurrentPage(res.page);
//             setLimit(res.limit);

//         } catch (err) {
//             setError("Failed to fetch listing properties");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ==============================
//     // 🔍 UPDATE FILTERS (NEW)
//     // ==============================
//     const updateFilters = (newFilters) => {
//         setFilters((prev) => ({
//             ...prev,
//             ...newFilters,
//         }));
//     };

//     // ==============================
//     // 🔄 RESET FILTERS (NEW)
//     // ==============================
//     const resetFilters = () => {
//         setFilters({
//             city: "",
//             type: "",
//             status: "",
//             min_price: "",
//             max_price: "",
//             search: "",
//         });
//     };

//     // ==============================
//     // 📦 PROPERTY DETAIL (same)
//     // ==============================
//     const fetchPropertyDetail = async (slug) => {
//         try {
//             setLoading(true);
//             setError(null);

//             const res = await getPropertyDetail(slug);
//             setPropertyDetail(res);

//         } catch (err) {
//             setError("Failed to fetch property detail");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <PropertyContext.Provider
//             value={{
//                 // states
//                 properties,
//                 propertyDetail,
//                 loading,
//                 error,

//                 // pagination
//                 totalCount,
//                 currentPage,
//                 limit,

//                 // filters
//                 filters,
//                 updateFilters,
//                 resetFilters,

//                 // functions
//                 fetchHomeProperties,
//                 fetchListingProperties,
//                 fetchPropertyDetail,
//             }}
//         >
//             {children}
//         </PropertyContext.Provider>
//     );
// };





// ============= After detail page



import { createContext, useState } from "react";
import {
    getProperties,
    getFilteredProperties,
    getPropertyDetail,
} from "../api/property";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {

    // 🔹 STATES
    const [properties, setProperties] = useState([]);
    const [propertyDetail, setPropertyDetail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 PAGINATION
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);

    // 🔹 FILTERS
    const [filters, setFilters] = useState({
        city: "",
        type: "",
        status: "",
        min_price: "",
        max_price: "",
        search: "",
    });

    // ==============================
    // 🏠 HOME
    // ==============================
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

    // 🔥 NEW: CLEAR DETAIL (IMPORTANT)
    const clearPropertyDetail = () => {
        setPropertyDetail(null);
    };

    return (
        <PropertyContext.Provider
            value={{
                // states
                properties,
                propertyDetail,
                loading,
                error,

                // pagination
                totalCount,
                currentPage,
                limit,

                // filters
                filters,
                updateFilters,
                resetFilters,

                // functions
                fetchHomeProperties,
                fetchListingProperties,
                fetchPropertyDetail,
                clearPropertyDetail, // 🔥 NEW
            }}
        >
            {children}
        </PropertyContext.Provider>
    );
};