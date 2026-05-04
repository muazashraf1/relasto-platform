// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// // import Login from './pages/Login'
// // import Signup from './pages/Signup'
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Listings from './pages/Listings'
// import PropertyDetail from './pages/PropertyDetail'

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login-page' element={<Login />} />
//         <Route path='/signup-page' element={<Signup />} />
//         <Route path='/property-listing' element={<Listings/>} />
//         <Route path='/property/:slug' element={<PropertyDetail/>} />
//       </Routes>
//     </>
//   )
// }

// export default App









import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";

// 🔥 NEW AGENT PAGES
import AgentList from "./pages/AgentList";
import AgentDetail from "./pages/AgentDetail";

import ProtectedRoute from "./components/ProtectedRoute";



//=======> agents 


import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProperties from "./pages/agent/AgentProperties";
import AgentVisitRequests from "./pages/agent/AgentVisitRequests";
import AgentProfile from "./pages/agent/AgentProfile";
import AgentPropertyCreate from "./pages/agent/AgentPropertyCreate";



function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/signup-page" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/property-listing" element={<Listings />} />
        <Route path="/property/:slug" element={<PropertyDetail />} />

        {/* AGENTS */}
        <Route path="/agents" element={<AgentList />} />
        <Route path="/agent/:id" element={<AgentDetail />} />

        {/* PROTECTED */}
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <div>Add Property Page</div>
            </ProtectedRoute>
          }
        />

        {/* ✅ NESTED AGENT ROUTES (FIXED) */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute>
              <AgentDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<h2>Welcome Agent</h2>} />
          <Route path="properties" element={<AgentProperties />} />
          <Route path="create-property" element={<AgentPropertyCreate />} />
          <Route path="requests" element={<AgentVisitRequests />} />
          <Route path="profile" element={<AgentProfile />} />
        </Route>

      </Routes>
    </>
  );
}
export default App;