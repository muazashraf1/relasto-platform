import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import UserProfile from "./pages/UserProfile";

import AgentList from "./pages/AgentList";
import AgentDetail from "./pages/AgentDetail";

import ProtectedRoute from "./components/ProtectedRoute";


import AgentPropertyCreate from "./pages/agent/AgentPropertyCreate";
import NotFound from "./pages/NotFound";
import UpdateProperty from "./pages/UpdateProperty";



function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/signup-page" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/property-listing" element={<Listings />} />
        <Route path="/property/:slug" element={<PropertyDetail />} />


        <Route path="/agents" element={<AgentList />} />
        <Route path="/agent/:id" element={<AgentDetail />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AgentPropertyCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-property/:slug"
          element={
            <ProtectedRoute>
              <UpdateProperty />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;