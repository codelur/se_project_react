import "./ModalWithForm.css";
function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  closeModal,
  isOpen,
  onSubmit,
}) {
  const deleteErrors = () => {
    const form = document.forms[name];
    form.querySelectorAll(".modal__error").forEach((p) => p.remove());
  };

  const handleClickOutside = (event) => {
    if (event.target === document.querySelector(".modal_opened")) {
      deleteErrors();
      closeModal();
    }
  };

  return (
    <div
      className={`modal  ${isOpen && "modal_opened"}`}
      onClick={handleClickOutside}
    >
      <div className={`modal__content modal__${name}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className={`modal__close`}
          onClick={() => {
            deleteErrors();
            closeModal();
          }}
        ></button>
        <form
          className={`modal__form modal_type_${name}`}
          id={name}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
