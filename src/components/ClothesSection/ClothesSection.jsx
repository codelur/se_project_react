import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, handleAddGarmentClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-clothes-btn"
          onClick={handleAddGarmentClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
