import "./Header.css";
import logo from "../../assets/logo.svg";
import ImageLoader from "../ImageLoader/ImageLoader";
import { avatarSrc, altAvatarSrc } from "../../utils/constants";

function Header({
  handleAddGarmentClick,
  weatherData,
  toggleMobileMenu,
  mobileMenuHandler,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className={`header__menu ${isMobileMenuOpened ? "hidden" : ""}`}>
        <div className="header__login">
          <img src={logo} alt="Logo" className="header__logo" />

          <button
            type="button"
            className="header__login-btn"
            onClick={toggleMobileMenu}
          ></button>
        </div>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div
        className={`header__user-container ${
          !isMobileMenuOpened ? "hidden" : ""
        } `}
      >
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddGarmentClick}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <ImageLoader
            src={avatarSrc}
            alternativeSrc={altAvatarSrc}
            alt={"Terrence Tegegne"}
            imageClass={"header__avatar"}
          />
        </div>
        <button className="header__close" onClick={mobileMenuHandler}></button>
      </div>
    </header>
  );
}

export default Header;
