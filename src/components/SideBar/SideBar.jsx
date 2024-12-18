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
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
