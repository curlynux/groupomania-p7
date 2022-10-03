import { Link } from "react-router-dom";
import { isAuth } from "../utils/auth";
import image from "../assets/logo.png";
import "../assets/header.css";
import "../assets/smartphone/header.css";

function Header() {
  return (
    <div className="flex justify-center h-[100px] bg-[#FD2D01] mb-[100px]">
      <Link to={isAuth() ? "/home" : "/"}>
        <img src={image} alt="logo" className="w-[220px] logo" />
      </Link>
    </div>
  );
}

export default Header;
