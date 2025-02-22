
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ closeModal, onAddItem, isOpen, formAddItemErrors }) {
  const { values, handleChange, isValid,  resetForm } =
    useFormAndValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid)
      if (await onAddItem(event, { name: values.name, imageUrl: values.imageUrl, weather: values.weather })) {
        resetForm()
      }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      closeModal={closeModal}
      name="add-garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      {formAddItemErrors.error && (
        <p className="modal__error">{formAddItemErrors.error}</p>
      )}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
        {formAddItemErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl || ""}
          required
        />
        {formAddItemErrors.imageUrl && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          ></input>
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            value="cold"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleChange}
            checked={values.weather === "cold"}
          ></input>
          Cold
        </label>
        {formAddItemErrors.weather && (
          <p className="modal__error">This field is required</p>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
