import "./ItemModal.css";
import ImageLoader from "../ImageLoader/ImageLoader";

function ItemModal({ closeModal, card, isOpen, onDeleteItem }) {
  const handleClickOutside = (event) => {
    if (event.target === document.querySelector(".modal_opened")) {
      closeModal();
    }
  };

  const deleteItem = () => {
    onDeleteItem(card._id);
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleClickOutside}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__image-close"
          onClick={closeModal}
        ></button>

        <ImageLoader
          src={card.imageUrl}
          alternativeSrc={card.imageUrl}
          alt={card.name}
          imageClass={"modal__image"}
        />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__delete">
            <button
              type="button"
              className="modal__delete-clothes-btn"
              onClick={deleteItem}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
