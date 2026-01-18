import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/" end className="bottom-item">
        🏠
        <span>Home</span>
      </NavLink>

      <NavLink to="/favorites" className="bottom-item">
        💖
        <span>Fav</span>
      </NavLink>

      <NavLink to="/contact" className="bottom-item">
        📞
        <span>Contact</span>
      </NavLink>

      <NavLink to="/about" className="bottom-item">
        👤
        <span>About</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
