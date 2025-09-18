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

  const currentWeatherContainer = document.createElement("div");
  currentWeatherContainer.classList.add("current-weather-container");

  // Store original weather data for conversion
  originalWeatherData = weatherData;

  function convertTemperature(value) {
    return currentUnit === "C" ? ((value - 32) * 5) / 9 : value;
  }

  const tempInfo = document.createElement("div");
  tempInfo.classList.add("temp-info");

  const currentTemp = document.createElement("p");
  currentTemp.classList.add("current-temp");
  currentTemp.textContent = `${convertTemperature(weatherData.temp).toFixed(
    0
  )}°${currentUnit}`;

  const feelsLikeInfo = document.createElement("p");
  feelsLikeInfo.classList.add("feels-like");
  feelsLikeInfo.textContent = `Feels Like: ${convertTemperature(
    weatherData.feelslike
  ).toFixed(0)}°${currentUnit}`;

  const locationContainer = document.createElement("div");
  locationContainer.classList.add("location-container");

  const locationName = document.createElement("h2");
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

  const humidityTitle = document.createElement("p");
  humidityTitle.classList.add("humidity-title");
  humidityTitle.textContent = `Humidity`;

  const humidityInfo = document.createElement("p");
  humidityInfo.classList.add("humidity-info");
  humidityInfo.textContent = `${weatherData.humidity}%`;

  const windTitle = document.createElement("p");
  windTitle.classList.add("wind-title");
  windTitle.textContent = `Wind Speed`;

  const windInfo = document.createElement("p");
  windInfo.classList.add("wind-info");
  windInfo.textContent = `${weatherData.windspeed} mph`;

  const precipTitle = document.createElement("p");
  precipTitle.classList.add("precip-title");
  precipTitle.textContent = `Precipitation`;

  const precipInfo = document.createElement("p");
  precipInfo.classList.add("precip-info");
  precipInfo.textContent = `${weatherData.precipprob}%`;

  const sunAndHighLowContainer = document.createElement("div");
  sunAndHighLowContainer.classList.add("sun-and-high-low-container");

  const sunContainer = document.createElement("div");
  sunContainer.classList.add("sun-container");

  const sunTitle = document.createElement("p");
  sunTitle.classList.add("sun-title");
  sunTitle.textContent = "Sunrise & Sunset";

  const sunRise = document.createElement("p");
  sunRise.classList.add("sunrise");
  sunRise.textContent = `Icon: ${weatherData.sunrise}`;

  const sunSet = document.createElement("p");
  sunSet.classList.add("sunset");
  sunSet.textContent = `Icon: ${weatherData.sunset}`;

  const highLowContainer = document.createElement("div");
  highLowContainer.classList.add("high-low-container");

  const highTemp = document.createElement("p");
  highTemp.classList.add("high-temp");
  highTemp.textContent = `High: ${convertTemperature(
    weatherData.days[0].tempmax
  ).toFixed(0)}°${currentUnit}`;

  const lowTemp = document.createElement("p");
  lowTemp.classList.add("low-temp");
  lowTemp.textContent = `Low: ${convertTemperature(
    weatherData.days[0].tempmin
  ).toFixed(0)}°${currentUnit}`;

  highLowContainer.appendChild(highTemp);
  highLowContainer.appendChild(lowTemp);

  sunContainer.appendChild(sunTitle);
  sunContainer.appendChild(sunRise);
  sunContainer.appendChild(sunSet);

  sunAndHighLowContainer.appendChild(sunContainer);
  sunAndHighLowContainer.appendChild(highLowContainer);

  moreDetailsContainer.appendChild(humidityTitle);
  moreDetailsContainer.appendChild(humidityInfo);
  moreDetailsContainer.appendChild(windTitle);
  moreDetailsContainer.appendChild(windInfo);
  moreDetailsContainer.appendChild(precipTitle);
  moreDetailsContainer.appendChild(precipInfo);

  tempInfo.appendChild(currentTemp);
  tempInfo.appendChild(feelsLikeInfo);

  conditionsContainer.appendChild(tempInfo);
  conditionsContainer.appendChild(conditionIcon);
  conditionsContainer.appendChild(conditionInfo);

  locationContainer.appendChild(locationName);
  locationContainer.appendChild(lastUpdated);

  currentWeatherContainer.appendChild(locationContainer);
  currentWeatherContainer.appendChild(conditionsContainer);
  currentWeatherContainer.appendChild(moreDetailsContainer);
  currentWeatherContainer.appendChild(sunAndHighLowContainer);

  weatherContainer.appendChild(currentWeatherContainer);

  // Render 5 day forecast
  const forecastTitleContainer = document.createElement("div");
  forecastTitleContainer.classList.add("forecast-title-container");

  const forecastTitle = document.createElement("h2");
  forecastTitle.classList.add("forecast-title");
  forecastTitle.textContent = "5 Day Forecast";

  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");

  weatherData.days.slice(1, 6).forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    const dayOfWeek = document.createElement("p");
    dayOfWeek.classList.add("day-of-week");
    dayOfWeek.textContent = day.dayOfWeek;

    const dateOfDay = document.createElement("p");
    dateOfDay.classList.add("day-name");
    dateOfDay.textContent = day.formattedDate;

    const dayConditionIcon = document.createElement("img");
    dayConditionIcon.setAttribute("width", "40px");
    dayConditionIcon.src = sunny;

    const dayTempMax = document.createElement("p");
    dayTempMax.classList.add("day-temp-max");
    dayTempMax.textContent = `High: ${convertTemperature(day.tempmax).toFixed(
      0
    )}°${currentUnit}`;

    const dayTempMin = document.createElement("p");
    dayTempMin.classList.add("day-temp-min");
    dayTempMin.textContent = `Low: ${convertTemperature(day.tempmin).toFixed(
      0
    )}°${currentUnit}`;

    const dayConditions = document.createElement("p");
    dayConditions.classList.add("day-conditions");
    dayConditions.textContent = `${day.conditions}`;

    const dayPrecip = document.createElement("p");
    dayPrecip.classList.add("day-precip");
    dayPrecip.textContent = `Precipitation: ${day.precip}%`;

    dayContainer.appendChild(dayOfWeek);
    dayContainer.appendChild(dateOfDay);
    dayContainer.appendChild(dayConditionIcon);
    dayContainer.appendChild(dayTempMax);
    dayContainer.appendChild(dayTempMin);
    dayContainer.appendChild(dayConditions);
    dayContainer.appendChild(dayPrecip);

    forecastContainer.appendChild(dayContainer);

    forecastTitleContainer.appendChild(forecastTitle);

    weatherContainer.appendChild(forecastTitleContainer);
    weatherContainer.appendChild(forecastContainer);
  });
}
