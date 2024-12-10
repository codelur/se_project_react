import "./ItemCard.css";
function ItemCard({ item, handleCardClick }) {
  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__item-image" src={item.link} alt={item.name} />
    </li>
  );
}
export default ItemCard;
