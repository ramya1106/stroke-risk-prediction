import "./index.css";

import { Link } from "react-router-dom";

import { use, useState } from "react";

import { IoMdMenu } from "react-icons/io";

function Header() {
  const [showMenu, changeShowMenu] = useState(false);
  let status = showMenu ? "show" : "hide";
  return (
    <nav className="navbar">
      <img
        src="https://res.cloudinary.com/dn9sdbv1o/image/upload/v1759328613/Stroke_risk_prediction_logo_u6urmr.png"
        alt="Logo"
        className="header-logo"
      />
      <IoMdMenu className="nav-menu-sm" onClick={() => changeShowMenu(!showMenu)} />
      
      <ul className={`nav-menu ${status}`}>
        <Link className="link" to="/">
          <li className="nav-item">Home</li>
        </Link>
        <Link className="link" to="/user-guide">
          <li className="nav-item">How to Use?</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
