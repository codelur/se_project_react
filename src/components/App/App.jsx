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
import {
  getItems,
  addItem,
  deleteItem,
  getFirstAvailableId,
} from "../../utils/api";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [formAddItemErrors, setFormAddItemErrors] = useState({});

  const handleAddGarmentClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuOpened(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("see-preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirmation-modal");
  };

  const closeModal = () => {
    setFormAddItemErrors({});
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(false);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const getClothingItems = () => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getClothingItems();
  }, []);

  const validateForm = async (event, item) => {
    event.preventDefault();

    let hasErrors = false;
    const errors = {};

    for (const field in item) {
      if (!item[field]) {
        errors[field] = `${field} is required`;
        hasErrors = true;
      }
    }

    setFormAddItemErrors(errors);
    if (!hasErrors) {
      const id = getFirstAvailableId(clothingItems);
      item._id = id;

      await addItem(item, clothingItems)
        .then(() => {
          setActiveModal("");
          setClothingItems([item, ...clothingItems]);
          return true;
        })
        .catch(console.error);
    }
    return false;
  };

  const onDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setActiveModal("");
        const newclothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(newclothingItems);
      })
      .catch(console.error);
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
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddGarmentClick={handleAddGarmentClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <ItemModal
            closeModal={closeModal}
            card={selectedCard}
            isOpen={activeModal === "see-preview"}
            onDeleteItem={onDeleteItem}
            openConfirmationModal={openConfirmationModal}
            activeModal={activeModal}
          ></ItemModal>
          <AddItemModal
            closeModal={closeModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={validateForm}
            formAddItemErrors={formAddItemErrors}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
