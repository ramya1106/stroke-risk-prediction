import "./index.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar">
      <img
        src="https://res.cloudinary.com/dn9sdbv1o/image/upload/v1759328613/Stroke_risk_prediction_logo_u6urmr.png"
        alt="Logo"
        className="header-logo"
      />
      <ul className="nav-menu">
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
