import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
//import { defaultClothingItems } from "../../utils/constants";

import ItemCard from "../ItemCard/ItemCard";
import randomize from "../../assets/aroundArrow.svg";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {`${weatherData.temp[currentTemperatureUnit]}`}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
      </section>
      {clothingItems.length > 0 && (
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      )}
      <button className="cards__btn-randomize">
        <img src={randomize} className="cards__btn-image" alt="randomize" />
        Randomize
      </button>
    </main>
  );
}

export default Main;
