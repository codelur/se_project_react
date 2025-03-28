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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";

import {
  getItems,
  addItem,
  deleteItem,
  getFirstAvailableId,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, signin, checkJWT } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

import "./App.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ link: "" });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formAddItemErrors, setFormAddItemErrors] = useState({});
  const [formSignUpErrors, setFormSignUpErrors] = useState({});
  const [formLoginErrors, setFormLoginErrors] = useState({});
  const [formEditProfileErrors, setFormEditProfileErrors] = useState({});

  //adding effect to close modals when pressing escape key
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const handleOverlay = (e) => {
      // that's why you should have a `modal` class name in each modal to be able to universally handle the overlay click
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    checkJWT({ token: jwt })
      .then(({ data }) => {
        setCurrentUser({
          username: data.name,
          email: data.email,
          avatar: data.avatar,
          _id: data._id,
        });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);
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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
    setIsMobileMenuOpened(false);
  };

  const switchModal = (name) => {
    setActiveModal(name);
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
    setFormSignUpErrors({});
    setFormLoginErrors({});
    setFormEditProfileErrors({});
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

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: "", email: "", avatar: "", _id: "" });
    removeToken();
  };

  const getClothingItems = () => {
    getItems()
      .then(({ data }) => {
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const loginSubmit = async (event, item) => {
    event.preventDefault();

    let hasErrors = false;
    const errors = {};

    for (const field in item) {
      if (!item[field]) {
        errors[field] = `${field} is required`;
        hasErrors = true;
      }
    }

    if (hasErrors) setFormLoginErrors(errors);
    if (!hasErrors) {
      try {
        const res = await signin(item);

        closeModal();
        setCurrentUser({
          username: res.name,
          email: res.email,
          avatar: res.avatar,
          _id: res._id,
        });
        setToken(res.token);
        setIsLoggedIn(true);
        setFormLoginErrors({});
        return true;
      } catch (error) {
        console.log(error);
        setFormLoginErrors({ ...errors, login: "Invalid credentials" });
        return false;
      }
    }

    return false;
  };

  const signUpSubmit = async (event, item) => {
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
      try{
        const res = await register(item);
        if (!res.message) {
          closeModal();
          return true;
        } else {
          setFormSignUpErrors({ ...errors, errors: res.message });
          return false;
        }
      } catch (error) {
        console.log(error);
        setFormSignUpErrors({ ...errors, errors: error.replace(/^Error\s\d+\s/, "") });
        return false;
      }
        
    }

    return false;
  };

  const editProfileSubmit = async (event, item) => {
    event.preventDefault();
    setIsLoading(true);
    await editProfile(item, getToken())
      .then((res) => {
        closeModal();
        setCurrentUser({
          username: res.name,
          email: res.email,
          avatar: res.avatar,
          _id: res._id,
        });
        setFormEditProfileErrors({});
        return true;
      })
      .catch((error) => {
        console.error(error);
        setFormEditProfileErrors((prevErrors) => ({
          ...prevErrors,
          error: error.split("failed: ")[1],
        }));
      }).finally(() => {
        setIsLoading(false);
      });

    return false;
  };

  const handleAddItem = async (event, item) => {
    event.preventDefault();
    setIsLoading(true);
    const id = getFirstAvailableId(clothingItems);
    item._id = id;

    try {
      const { data } = await addItem(item, getToken());
      closeModal();
      item._id = data._id;
      item.owner = data.owner;
      item.likes = [];
      setClothingItems([item, ...clothingItems]);
      setFormAddItemErrors({});
      return true;
    } catch (error) {
      console.error("Error:", error.message);
      setFormAddItemErrors((prevErrors) => ({
        ...prevErrors,
        error: error.message.split("failed: ")[1],
      }));
    }finally{
      setIsLoading(false);
    }

    return false;
  };

  const onDeleteItem = (id) => {
    deleteItem(id, getToken())
      .then(() => {
        closeModal();
        const newclothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(newclothingItems);
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
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
                    handleCardLike={handleCardLike}
                  />
                }
              ></Route>

              <Route
                path="/profile"
                element={
                  <ProtectedRoute anonymous={!isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddGarmentClick={handleAddGarmentClick}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOut={handleLogOut}
                      handleCardLike={handleCardLike}
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
              onAddItem={handleAddItem}
              formAddItemErrors={formAddItemErrors}
              isLoading={isLoading}
            />
            <RegisterModal
              closeModal={closeModal}
              onSignUp={signUpSubmit}
              isOpen={activeModal === "signup"}
              formSignUpErrors={formSignUpErrors}
              switchModal={switchModal}
            />
            <LoginModal
              closeModal={closeModal}
              onLogin={loginSubmit}
              isOpen={activeModal === "login"}
              formLoginErrors={formLoginErrors}
              switchModal={switchModal}
            />
            <EditProfileModal
              closeModal={closeModal}
              onEdit={editProfileSubmit}
              isOpen={activeModal === "edit-profile"}
              formEditProfileErrors={formEditProfileErrors}
              isLoading={isLoading}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
