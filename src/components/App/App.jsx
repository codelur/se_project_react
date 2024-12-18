import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

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

  const deleteErrors = (form) => {
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

    const form = event.target;
    deleteErrors(form);
    const invalidInputs = getInvalidInputs(form);
    if (invalidInputs.length > 0) {
      addErrorMessage(invalidInputs);
    } else {
      form.submit();
    }
  };

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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            ></Route>
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ItemModal
            closeModal={closeModal}
            card={selectedCard}
            isOpen={activeModal === "see-preview"}
          ></ItemModal>
          <AddItemModal
            closeModal={closeModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={validateForm}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
