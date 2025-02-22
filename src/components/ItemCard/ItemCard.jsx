import "./ItemCard.css";

import { useContext } from "react"; 
import { defaultLiked, liked } from "../../utils/constants";

import ImageLoader from "../ImageLoader/ImageLoader";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some(id => id === currentUser._id);

  const itemLikeButtonSrc = isLiked?liked:defaultLiked;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleCardLike({id: item._id, isLiked});
  }

  

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__feature">
      <h2 className="card__name">{item.name}</h2>
      {currentUser._id!= "" &&<button className="card__btn-like" onClick={handleLike}>
          <img src={itemLikeButtonSrc} className="cards__btn-image" alt="liked" />
      </button>}
      </div>
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
