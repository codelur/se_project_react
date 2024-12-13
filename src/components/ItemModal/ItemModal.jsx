import "./ItemModal.css";
import ImageLoader from "../ImageLoader/ImageLoader";

function ItemModal({ activeModal, closeModal, card, isOpen }) {
  const handleClickOutside = (event) => {
    if (event.target === document.querySelector(".modal_opened")) {
      closeModal();
    }
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
          src={card.link}
          alternativeSrc={card.link}
          alt={card.name}
          imageClass={"modal__image"}
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
