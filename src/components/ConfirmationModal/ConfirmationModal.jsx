import "./ConfirmationModal.css";

function ConfirmationModal({
  isOpen,
  card,
  confirmationInfo,
  buttonText,
  onConfirmation,
  closeModal,
}) {
  const deleteItem = () => {
    onConfirmation(card._id);
  };

  return (
    <div className={`modal  ${isOpen && "modal_opened"}`}>
      <div className="modal__confirmation-content">
        <h2 className="modal__message">{confirmationInfo}</h2>
        <button
          type="button"
          className={`modal__close`}
          onClick={closeModal}
        ></button>
        <button type="button" className="modal__confirm" onClick={deleteItem}>
          {buttonText}
        </button>
        <button type="button" className="modal__cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
