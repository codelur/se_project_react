import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherAPi";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    condition: "",
    isDay: false,
    conditionCode: 0,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ link: "" });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddGarmentClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuOpened(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("see-preview");
    setSelectedCard(card);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(true);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(false);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            handleAddGarmentClick={handleAddGarmentClick}
            weatherData={weatherData}
            toggleMobileMenu={toggleMobileMenu}
            mobileMenuHandler={mobileMenuHandler}
            isMobileMenuOpened={isMobileMenuOpened}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            closeModal={closeModal}
            name="add-garment"
            isOpen={activeModal === "add-garment"}
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
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="hot"
                  name="weather"
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
                  name="weather"
                  className="modal__input_type_radio"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="cold"
                  name="weather"
                  className="modal__input_type_radio"
                ></input>
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            closeModal={closeModal}
            card={selectedCard}
            isOpen={activeModal === "see-preview"}
          ></ItemModal>
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
