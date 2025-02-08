import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, handleAddGarmentClick, handleEditProfileClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddGarmentClick={handleAddGarmentClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
