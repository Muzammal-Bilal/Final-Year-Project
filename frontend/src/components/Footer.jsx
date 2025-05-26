import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const names = [
    {
      id: 1,
      name: "Mr. Shahid Mehmood",
    },
    {
      id: 2,
      name: "Muhammad Yasin",
    },
    {
      id: 3,
      name: "Muzammal Bilal",
    },
    {
      id: 4,
      name: "Muhammad Shahzaib",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/dashboard"}>DashBoard</Link>
            </ul>
          </div>
          <div>
            <h4>Developed By</h4>
            <ul>
              {names.map((element) => (
                <li key={element.id}>
                  <span>{element.name}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;