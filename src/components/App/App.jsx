import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherAPi";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  getFirstAvailableId,
} from "../../utils/api";
import { register, signin } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

import "./App.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    condition: "",
    isDay: false,
    conditionCode: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "", avatar: "" });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ link: "" });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const [formAddItemErrors, setFormAddItemErrors] = useState({});
  const [formSignUpErrors, setFormSignUpErrors] = useState({});
  const [formLoginErrors, setFormLoginErrors] = useState({});

  const handleAddGarmentClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuOpened(false);
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
    setIsMobileMenuOpened(false);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
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
      .then(({data}) => {
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

  const loginSubmit = async (event, item) =>{
    event.preventDefault();

    let hasErrors = false;
    const errors = {};

    for (const field in item) {
      if (!item[field]) {
        errors[field] = `${field} is required`;
        hasErrors = true;
      }
    }

    setFormLoginErrors(errors);
    if (!hasErrors) {
      await signin(item)
      .then((res)=>{
        setActiveModal("");
        setUserData({ username: res.name, email: item.email, avatar: res.avatar });
        setToken(res.token);
        setIsLoggedIn(true);
        return true;
      })
      .catch(console.error);

    }

    return false;
  }

  const signUpSubmit = async (event, item) =>{
    event.preventDefault();

    let hasErrors = false;
    const errors = {};

    for (const field in item) {
      if (!item[field]) {
        errors[field] = `${field} is required`;
        hasErrors = true;
      }
    }

    setFormSignUpErrors(errors);
    if (!hasErrors) {
      await register(item)
      .then(()=>{
        setActiveModal("");
        return true;
      })
      .catch(console.error);

    }

    return false;
  }

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
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
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
                  <ProtectedRoute  anonymous>
                  <Profile
                    handleCardClick={handleCardClick}
                    handleAddGarmentClick={handleAddGarmentClick}
                    clothingItems={clothingItems}
                  />
                  </ProtectedRoute>
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
          <RegisterModal 
            closeModal={closeModal}
            onSignUp={signUpSubmit}
            isOpen={activeModal === "signup"}
            formSignUpErrors={formSignUpErrors}
          />
          <LoginModal 
            closeModal={closeModal}
            onLogin={loginSubmit}
            isOpen={activeModal === "login"}
            formLoginErrors={formLoginErrors}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
