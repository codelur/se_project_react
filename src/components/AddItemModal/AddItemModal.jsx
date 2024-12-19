import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ closeModal, onAddItem, isOpen }) {
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const [weather, SetWeather] = useState("");
  const handleWeatherChange = (event) => {
    SetWeather(event.target.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem(event, { name, imageUrl, weather });
    setName("");
    setImageUrl("");
    SetWeather("");
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
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          ></input>
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            name="weather"
            className="modal__input_type_radio"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          ></input>
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
