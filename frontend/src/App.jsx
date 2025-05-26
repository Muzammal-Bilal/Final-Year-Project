import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/Notfound";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const showNavFooter = !location.pathname.includes('/dashboard');

  return (
    <>
      {showNavFooter && <Navbar />}
      {children}
      {showNavFooter && <Footer />}
    </>
  );
};

const App = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  
  return (
    <>
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Home />
            </AppLayout>
          } />
          <Route path="/register" element={
            <AppLayout>
              <Register />
            </AppLayout>
          } />
          <Route path="/login" element={
            <AppLayout>
              <Login />
            </AppLayout>
          } />
          <Route element={<ProtectedRoute/>}>    
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={
            <AppLayout>
              <NotFound />
            </AppLayout>
          } />
        </Routes>
      </Router>
    </>
  );
};

export default App;