import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, handleAddGarmentClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddGarmentClick={handleAddGarmentClick}
        />
      </section>
    </div>
  );
}

export default Profile;
