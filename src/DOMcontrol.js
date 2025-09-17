import { getWeatherData } from "./weather-data";
import sunny from "./assets/sunny.svg";

let originalWeatherData = {};
let currentUnit = "F";

export function DOMcontrol() {
  const mainContainer = document.querySelector(".main-container");
  const headerContainer = document.querySelector(".header-container");

  const headerTitle = document.createElement("header");
  headerTitle.textContent = "Weather App";
  headerTitle.classList.add("header-title");

  const degreesContainer = document.createElement("div");
  degreesContainer.classList.add("degrees-container");

  const fahrenheitBtn = document.createElement("button");
  fahrenheitBtn.textContent = "F°";
  fahrenheitBtn.classList.add("fahrenheit-button");

  const celsiusBtn = document.createElement("button");
  celsiusBtn.textContent = "C°";
  celsiusBtn.classList.add("celsius-button");

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-container");

  headerContainer.appendChild(headerTitle);

  degreesContainer.appendChild(fahrenheitBtn);
  degreesContainer.appendChild(celsiusBtn);

  mainContainer.appendChild(degreesContainer);
  mainContainer.appendChild(weatherContainer);

  const weatherSearch = document.getElementById("weatherSearch");

  weatherSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = document.getElementById("location").value;
    getWeatherData(location);
  });

  fahrenheitBtn.addEventListener("click", () => {
    currentUnit = "F"; // Update the current unit
    renderWeather(originalWeatherData);
  });

  celsiusBtn.addEventListener("click", () => {
    currentUnit = "C"; // Update the current unit
    renderWeather(originalWeatherData);
  });
}

export function renderWeather(weatherData) {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = "";

  // Store original weather data for conversion
  originalWeatherData = weatherData;

  const temperature =
    currentUnit === "C" ? ((weatherData.temp - 32) * 5) / 9 : weatherData.temp;
  const feelsLike =
    currentUnit === "C"
      ? ((weatherData.feelslike - 32) * 5) / 9
      : weatherData.feelslike;

  const tempInfo = document.createElement("p");
  tempInfo.classList.add("temp-info");
  tempInfo.textContent = `${temperature.toFixed(1)}°${currentUnit}`;

  const feelsLikeInfo = document.createElement("p");
  feelsLikeInfo.classList.add("feels-like");
  feelsLikeInfo.textContent = `Feels Like: ${feelsLike.toFixed(
    1
  )}°${currentUnit}`;

  const locationContainer = document.createElement("div");
  locationContainer.classList.add("location-container");

  const locationName = document.createElement("p");
  locationName.classList.add("location-name");
  locationName.textContent = weatherData.location;

  const lastUpdated = document.createElement("p");
  lastUpdated.classList.add("last-updated");
  lastUpdated.textContent = `Last Updated: ${weatherData.lastUpdated}`;

  const conditionsContainer = document.createElement("div");
  conditionsContainer.classList.add("conditions-container");

  const conditionIcon = document.createElement("img");
  conditionIcon.setAttribute("width", "130px");
  conditionIcon.src = sunny;

  const conditionInfo = document.createElement("p");
  conditionInfo.classList.add("condition-info");
  conditionInfo.textContent = `${weatherData.conditions}`;

  const moreDetailsContainer = document.createElement("div");
  moreDetailsContainer.classList.add("more-details-container");

  const humidityInfo = document.createElement("p");
  humidityInfo.classList.add("humidity-info");
  humidityInfo.textContent = `Humidity: ${weatherData.humidity}%`;

  const windInfo = document.createElement("p");
  windInfo.classList.add("wind-info");
  windInfo.textContent = `Wind Speed: ${weatherData.windspeed} mph`;

  const chanceOfPrecip = document.createElement("p");
  chanceOfPrecip.classList.add("chance-of-precip");
  chanceOfPrecip.textContent = `Precipitation: ${weatherData.precipprob}%`;

  const sunContainer = document.createElement("div");
  sunContainer.classList.add("sun-container");

  const sunRise = document.createElement("p");
  sunRise.classList.add("sunrise");
  sunRise.textContent = `Sunrise: ${weatherData.sunrise}`;

  const sunSet = document.createElement("p");
  sunSet.classList.add("sunset");
  sunSet.textContent = `Sunset: ${weatherData.sunset}`;

  const highLowContainer = document.createElement("div");
  highLowContainer.classList.add("high-low-container");

  const highTemp = document.createElement("p");
  highTemp.classList.add("high-temp");
  highTemp.textContent = `High: ${temperature.toFixed(1)}°${currentUnit}`;

  const lowTemp = document.createElement("p");
  lowTemp.classList.add("low-temp");
  lowTemp.textContent = `Low: ${temperature.toFixed(1)}°${currentUnit}`;

  highLowContainer.appendChild(highTemp);
  highLowContainer.appendChild(lowTemp);

  sunContainer.appendChild(sunRise);
  sunContainer.appendChild(sunSet);

  moreDetailsContainer.appendChild(humidityInfo);
  moreDetailsContainer.appendChild(windInfo);
  moreDetailsContainer.appendChild(chanceOfPrecip);

  conditionsContainer.appendChild(tempInfo);
  conditionsContainer.appendChild(feelsLikeInfo);
  conditionsContainer.appendChild(conditionIcon);
  conditionsContainer.appendChild(conditionInfo);

  locationContainer.appendChild(locationName);
  locationContainer.appendChild(lastUpdated);

  weatherContainer.appendChild(locationContainer);
  weatherContainer.appendChild(conditionsContainer);
  weatherContainer.appendChild(moreDetailsContainer);
  weatherContainer.appendChild(sunContainer);
  weatherContainer.appendChild(highLowContainer);

  // Render 5 day forecast
  weatherData.days.slice(1, 6).forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    const dayOfWeek = document.createElement("p");
    dayOfWeek.classList.add("day-of-week");
    dayOfWeek.textContent = day.dayOfWeek;

    const dateOfDay = document.createElement("p");
    dateOfDay.classList.add("day-name");
    dateOfDay.textContent = day.formattedDate;

    const dayTempMax = document.createElement("p");
    dayTempMax.classList.add("day-temp-max");
    dayTempMax.textContent = `High: ${temperature.toFixed(1)}°${currentUnit}`;

    const dayTempMin = document.createElement("p");
    dayTempMin.classList.add("day-temp-min");
    dayTempMin.textContent = `Low:${temperature.toFixed(1)}°${currentUnit}`;

    const dayConditions = document.createElement("p");
    dayConditions.classList.add("day-conditions");
    dayConditions.textContent = `${day.conditions}`;

    const dayPrecip = document.createElement("p");
    dayPrecip.classList.add("day-precip");
    dayPrecip.textContent = `Precipitation: ${day.precip}%`;

    dayContainer.appendChild(dayOfWeek);
    dayContainer.appendChild(dateOfDay);
    dayContainer.appendChild(dayTempMax);
    dayContainer.appendChild(dayTempMin);
    dayContainer.appendChild(dayConditions);
    dayContainer.appendChild(dayPrecip);

    weatherContainer.appendChild(dayContainer);
  });
}
