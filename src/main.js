import "./styles.css";
import { getWeatherData, dailyForcast } from "./weather-data";
import { DOMcontrol } from "./DOMcontrol";
import { renderWeather } from "./DOMcontrol";

console.log(getWeatherData, dailyForcast, renderWeather);

DOMcontrol();
