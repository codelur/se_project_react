import "./ItemModal.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function ItemModal({
  closeModal,
  card,
  isOpen,
  onDeleteItem,
  openConfirmationModal,
  activeModal,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
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
              onClick={openConfirmationModal}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={activeModal === "confirmation-modal"}
        card={card}
        confirmationInfo="Are you sure you want to delete this item?This action is irreversible."
        buttonText="Yes, delete item"
        onConfirmation={onDeleteItem}
        closeModal={closeModal}
      />
    </div>
  );
}

export default ItemModal;
