import { getWeatherData } from "./weather-data";
import sunny from "./assets/sunny.svg";

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
  weatherContainer.textContent = "weather goes here";

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
}

export function renderWeather(weatherData) {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = "";

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

  const tempInfo = document.createElement("p");
  tempInfo.classList.add("temp-info");
  tempInfo.textContent = `${weatherData.temp}°F`;

  const feelsLike = document.createElement("p");
  feelsLike.classList.add("feels-like");
  feelsLike.textContent = `Feels Like: ${weatherData.feelslike}°F`;

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
  highTemp.textContent = `High: ${weatherData.days[0].tempmax}°F`;

  const lowTemp = document.createElement("p");
  lowTemp.classList.add("low-temp");
  lowTemp.textContent = `Low: ${weatherData.days[0].tempmin}°F`;

  highLowContainer.appendChild(highTemp);
  highLowContainer.appendChild(lowTemp);

  sunContainer.appendChild(sunRise);
  sunContainer.appendChild(sunSet);

  moreDetailsContainer.appendChild(humidityInfo);
  moreDetailsContainer.appendChild(windInfo);
  moreDetailsContainer.appendChild(chanceOfPrecip);

  conditionsContainer.appendChild(tempInfo);
  conditionsContainer.appendChild(feelsLike);
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

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    dayName.textContent = day.formattedDate;

    const dayTempMax = document.createElement("p");
    dayTempMax.classList.add("day-temp-max");
    dayTempMax.textContent = `High: ${day.tempmax}°F`;

    const dayTempMin = document.createElement("p");
    dayTempMin.classList.add("day-temp-min");
    dayTempMin.textContent = `Low: ${day.tempmin}°F`;

    const dayConditions = document.createElement("p");
    dayConditions.classList.add("day-conditions");
    dayConditions.textContent = `${day.conditions}`;

    const dayPrecip = document.createElement("p");
    dayPrecip.classList.add("day-precip");
    dayPrecip.textContent = `Precipitation: ${day.precip}%`;

    dayContainer.appendChild(dayName);
    dayContainer.appendChild(dayTempMax);
    dayContainer.appendChild(dayTempMin);
    dayContainer.appendChild(dayConditions);
    dayContainer.appendChild(dayPrecip);

    weatherContainer.appendChild(dayContainer);
  });
}
