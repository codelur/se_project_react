import "./ModalWithForm.css";
import React, { useEffect } from "react";
function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  activeModal,
  closeModal,
}) {
  const handleClickOutside = (event) => {
    if (event.target === document.querySelector(".modal__opened")) {
      closeModal();
    }
  };

  const validateForm = (event) => {
    console.log("is this firing");
    return;
    // event.preventDefault();
    const form = document.forms[name];
    const inputs = form.querySelectorAll("input");
    event.preventDefault();
    const emptyInputs = Array.from(inputs).filter((input) => !input.value);
    if (emptyInputs.length > 0) {
      event.preventDefault();
      emptyInputs.forEach((input) => {
        input.parentNode.insertAdjacentHTML(
          "beforeend",
          '<p style="color: red;">This field is required</p>'
        );
      });
    } else {
      form.submit();
    }
  };
  //   useEffect(() => {
  //     const form = document.forms[name];
  //     form.addEventListener("submit", function (event) {
  //       const form = document.forms[name];
  //       const inputs = form.querySelectorAll("input");
  //       event.preventDefault();
  //       const emptyInputs = Array.from(inputs).filter((input) => !input.value);
  //       if (emptyInputs.length > 0) {
  //         event.preventDefault();
  //         emptyInputs.forEach((input) => {
  //           input.parentNode.insertAdjacentHTML(
  //             "beforeend",
  //             '<p style="color: red;">This field is required</p>'
  //           );
  //         });
  //       } else {
  //         form.submit();
  //       }
  //     });
  //   }, [activeModal]);

  return (
    <div
      className={`modal ${activeModal === "add garment" && "modal__opened"}`}
      onClick={handleClickOutside}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__garment-close"
          onClick={closeModal}
        ></button>
        <form
          className={`modal__form modal_type_${name}`}
          id={name}
          onSubmit={validateForm}
        >
          {children}
          <button
            type="submit"
            className="modal__submit"
            // onClick={validateForm}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
