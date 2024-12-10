import "./ItemModal.css";

function ItemModal({ activeModal, closeModal, card }) {
  const handleClickOutside = (event) => {
    if (event.target === document.querySelector(".modal__opened")) {
      closeModal();
    }
  };
  return (
    <div
      className={`modal ${activeModal === "see preview" && "modal__opened"}`}
      onClick={handleClickOutside}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={closeModal}
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
