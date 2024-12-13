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
      deleteErrors();
      closeModal();
    }
  };

  const deleteErrors = () => {
    const form = document.forms[name];
    form.querySelectorAll(".modal__error").forEach((p) => p.remove());
  };

  const addErrorMessage = (inputs) => {
    inputs.forEach((input) => {
      input.parentNode.insertAdjacentHTML(
        "beforeend",
        '<p style="color: red;" class="modal__error">This field is required</p>'
      );
    });
  };

  const getInvalidInputs = (form) => {
    const invalidInputs = Array.from(form.querySelectorAll("input, fieldset"))
      .filter((element) => {
        if (element.tagName === "INPUT") {
          return !element.value;
        } else if (element.tagName === "FIELDSET") {
          const radios = element.querySelectorAll('input[type="radio"]');
          return !Array.from(radios).some((radio) => radio.checked);
        }
        return false;
      })
      .map((element) => {
        if (element.tagName === "FIELDSET") {
          return element.querySelector(".modal__label_type_radio");
        } else {
          return element;
        }
      });
    return invalidInputs;
  };

  const validateForm = (event) => {
    event.preventDefault();

    deleteErrors();
    const form = document.forms[name];
    const invalidInputs = getInvalidInputs(form);
    if (invalidInputs.length > 0) {
      addErrorMessage(invalidInputs);
    } else {
      form.submit();
    }
  };

  return (
    <div
      className={`modal  ${activeModal === "add garment" && "modal__opened"}`}
      onClick={handleClickOutside}
    >
      <div className="modal__content modal__garment">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__garment-close"
          onClick={() => {
            deleteErrors();
            closeModal();
          }}
        ></button>
        <form
          className={`modal__form modal_type_${name}`}
          id={name}
          onSubmit={validateForm}
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
