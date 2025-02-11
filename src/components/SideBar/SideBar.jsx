import { useContext } from "react"; 
import ImageLoader from "../ImageLoader/ImageLoader";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./SideBar.css";

function SideBar({handleEditProfileClick, handleLogOut}) {
  const {  currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
      <ImageLoader
        src={currentUser.avatar}
        userInitial={currentUser.username?currentUser.username.charAt(0).toUpperCase():""}
        alt={`${currentUser.username}`}
        imageClass={"sidebar__avatar"}
      />
      <p className="sidebar__username">{currentUser.username}</p>
      </div>
      <div className="sidebar__profile_options">
        
        <button type="button" className="sidebar__change-profile"
        onClick={handleEditProfileClick}>
          Change profile data
        </button>
        <button type="button" className="sidebar__logout"
        onClick={handleLogOut} >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
