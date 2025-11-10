import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, setSearchQuery } = useContext(StoreContext);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully")
    navigate("/");
  }

  useEffect(()=>{
    if(showSearchInput && searchRef.current){
      searchRef.current.focus();
    }
  },[showSearchInput])

  const toggleSearch = () => {
    setShowSearchInput((prev) => !prev);
    if(showSearchInput){
      // clearing when closing
      setSearchValue("");
      setSearchQuery("");
    }
  };

  const onSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    setSearchQuery(val);
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" onClick={toggleSearch} style={{cursor:'pointer'}} />
        {showSearchInput && (
          <input
            ref={searchRef}
            className="navbar-search-input"
            type="text"
            placeholder="Search dishes..."
            value={searchValue}
            onChange={onSearchChange}
          />
        )}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
