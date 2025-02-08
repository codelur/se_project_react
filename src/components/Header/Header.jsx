import "./Header.css";

import { useContext } from "react"; 
import { Link } from "react-router-dom";

import { avatarSrc, altAvatarSrc } from "../../utils/constants";
import logo from "../../assets/logo.svg";

import ImageLoader from "../ImageLoader/ImageLoader";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function Header({
  handleAddGarmentClick,
  handleLoginClick,
  handleSignupClick,
  weatherData,
  toggleMobileMenu,
  mobileMenuHandler,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className={`header__menu`}>
        <div className="header__login">
          <Link to="/">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
          <button
            type="button"
            className="header__login-btn"
            onClick={toggleMobileMenu}
          ></button>
        </div>
      </div>

      <div
        className={`header__user-container ${
          !isMobileMenuOpened ? "hidden" : ""
        } `}
      >
        <ToggleSwitch />
        {!isLoggedIn && <div  className="header__non-user-options">
          <button
            type="button"
            className="header__signup-btn"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>

          <button
            type="button"
            className="header_login-modal-btn"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>
        }
        {isLoggedIn && <div  className="header__user-options">
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddGarmentClick}
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link" onClick={toggleMobileMenu}>
            <div className="header__user">
              <p className="header__username">{currentUser.username}</p>
              <ImageLoader
                src={avatarSrc}
                userInitial={currentUser.username.charAt(0).toUpperCase()}
                alt={`${currentUser.username}`}
                imageClass={"header__avatar"}
              />
            </div>
          </Link>
        </div>
        }
        <button className="header__close" onClick={mobileMenuHandler}></button>
      </div>
    </header>
  );
}

export default Header;
