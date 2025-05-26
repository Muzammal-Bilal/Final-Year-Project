import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import persistor from "../main.jsx"; 
import { setLogout } from "../../state/index.js";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        { withCredentials: true }
      );

      dispatch(setLogout()); // ✅ Correct usage of Redux logout action
      await persistor.purge(); // ✅ Await outside `.then()` - this was a syntax error
      toast.success(res.data.message); // ✅ Show logout success
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            <Link to={"/dashboard"} onClick={() => setShow(false)}>
              DashBoard
            </Link>
          </div>
          {isLoggedIn ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;


