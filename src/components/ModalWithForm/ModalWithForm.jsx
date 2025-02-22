import "./ModalWithForm.css";
function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  closeModal,
  isOpen,
  onSubmit,
  altButtonText,
  switchModal,
  modal,
  isLoading,
}) {
  const changeModal = () => {
    switchModal(modal);
  };
  return (
    <div className={`modal  ${isOpen && "modal_opened"}`}>
      <div className={`modal__content modal__${name}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className={`modal__close`}
          onClick={closeModal}
        ></button>
        <form
          className={`modal__form modal_type_${name}`}
          id={name}
          onSubmit={onSubmit}
        >
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
            {isLoading? 'Saving...' : buttonText}
            </button>
            {altButtonText && (
              <button
                type="button"
                className="modal__alt"
                onClick={changeModal}
              >
                {altButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
