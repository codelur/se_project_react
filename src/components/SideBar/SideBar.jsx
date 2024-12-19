import { avatarSrc, altAvatarSrc } from "../../utils/constants";
import ImageLoader from "../ImageLoader/ImageLoader";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <ImageLoader
        src={avatarSrc}
        alternativeSrc={altAvatarSrc}
        alt={"Terrence Tegegne"}
        imageClass={"sidebar__avatar"}
      />
      <div className="sidebar__profile_options">
        <p className="sidebar__username">Terrence Tegegne</p>
        <button type="button" className="sidebar__change-profile">
          Change profile data
        </button>
        <button type="button" className="sidebar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
