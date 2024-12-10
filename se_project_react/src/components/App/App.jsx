import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const handleAddGarmentClick = () => {
    setActiveModal("add garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("see preview");
    setSelectedCard(card);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddGarmentClick={handleAddGarmentClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          closeModal={closeModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="hot"
                className="modal__input_type_radio"
              ></input>
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="warm"
                className="modal__input_type_radio"
              ></input>
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="cold"
                className="modal__input_type_radio"
              ></input>
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          closeModal={closeModal}
          card={selectedCard}
        ></ItemModal>
        <Footer />
      </div>
    </div>
  );
}

export default App;
