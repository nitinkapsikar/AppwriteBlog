import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import CreateBlog from "../pages/CreateBlog";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";
import SingleBlog from "../pages/SingleBlog";
import EditBlog from "../pages/EditBlog";
import PleaseLogin from "../pages/PleaseLogin";
import { useAuth } from "../context/MainContext";


const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/please-login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/please-login" element={<PleaseLogin />} />

  <Route
     path="/edit/:id"
     element={
        <ProtectedRoute>
         <EditBlog />
        </ProtectedRoute>
     }
   />

      
      
      {/* 🔐 Protected */}
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />

      <Route path="/blog/:id" element={<SingleBlog />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
