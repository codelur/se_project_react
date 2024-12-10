import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";

function WeatherCard() {
  return (
    <section className="weater-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
