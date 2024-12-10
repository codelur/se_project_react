import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  activeModal,
  closeModal,
}) {
  return (
    <div
      className={`modal ${activeModal === "add garment" && "modal__opened"}`}
      onClick={closeModal}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={closeModal}
        ></button>
        <form className={`modal__form modal_type_${name}`} id={name}>
          {children}
          <button type="button" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
