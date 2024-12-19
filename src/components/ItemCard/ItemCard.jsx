import "./ItemCard.css";
import ImageLoader from "../ImageLoader/ImageLoader";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>

      <ImageLoader
        src={item.imageUrl}
        alternativeSrc={item.imageUrl}
        alt={item.name}
        imageClass={"card__item-image"}
      />
    </li>
  );
}
export default ItemCard;
