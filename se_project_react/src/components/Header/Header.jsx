import "./Header.css";
import logo from "../../assets/logo.svg";
import ImageLoader from "../ImageLoader/ImageLoader";
import { avatarSrc, altAvatarSrc } from "../../utils/constants";

function Header({ handleAddGarmentClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const alt = "Terrence Tegegne";
  const imageClass = "header__avatar";

  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddGarmentClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <ImageLoader
          src={avatarSrc}
          alternativeSrc={altAvatarSrc}
          alt={alt}
          imageClass={imageClass}
        />
      </div>
    </header>
  );
}

export default Header;
