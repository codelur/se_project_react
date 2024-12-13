import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import ImageLoader from "../ImageLoader/ImageLoader";

function WeatherCard({ weatherData }) {
  const getWeatherImage = (isDay, conditionCode) => {
    if (conditionCode === undefined) return "";
    const firstLetterOfConditionCode = conditionCode.toString().charAt(0);
    let condition;
    switch (firstLetterOfConditionCode) {
      case "2":
        condition = "storm";
        break;
      case "3":
      case "5":
        condition = "rain";
        break;
      case "6":
        condition = "snow";
        break;
      case "7":
        condition = "atmosphere";
        break;
      default:
        condition = conditionCode === "800" ? "clear" : "clouds";
    }
    const options = weatherOptions.filter((item) => {
      return item.isDay === isDay && item.condition === condition;
    });
    return options ? options[0].url : "";
  };

  const imageURL = getWeatherImage(
    weatherData.isDay,
    weatherData.conditionCode
  );

  return (
    <section className="weater-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <ImageLoader
        src={imageURL}
        alternativeSrc={imageURL}
        alt={weatherData.condition}
        imageClass={"weather-card__image"}
      />
    </section>
  );
}

export default WeatherCard;
