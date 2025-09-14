import { getWeatherData } from "./weather-data";
import { dailyForcast } from "./weather-data";

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
    dailyForcast(location); // get 5 day forcast
  });

  function renderWeather(weatherData) {
    weatherContainer.innerHTML = "";

    const locationContainer = document.createElement("div");
    locationContainer.classList.add("location-container");

    const locationName = document.createElement("p");
    locationName.classList.add("location-name");
    locationName.textContent = weatherData.location;

    const locationCountry = document.createElement("p");
    locationCountry.classList.add("location-country");

    const lastUpdated = document.createElement("p");
    lastUpdated.classList.add("last-updated");

    const conditionsContainer = document.createElement("div");
    conditionsContainer.classList.add("conditions-container");

    const tempInfo = document.createElement("p");
    tempInfo.classList.add("temp-info");
    tempInfo.textContent = `Temperature: ${weatherData.temp}°F`;

    const feelsLike = document.createElement("p");
    feelsLike.classList.add("feels-like");

    const conditionIcon = document.createElement("img");
    conditionIcon.setAttribute("width", "130px");
    conditionIcon.src = weatherData.icon;

    const conditionInfo = document.createElement("p");
    conditionInfo.classList.add("condition-info");

    const moreDetailsContainer = document.createElement("div");
    moreDetailsContainer.classList.add("more-details-container");

    const humidityInfo = document.createElement("p");
    humidityInfo.classList.add("humidity-info");

    const windInfo = document.createElement("p");
    windInfo.classList.add("wind-info");

    const chanceOfPrecip = document.createElement("p");
    chanceOfPrecip.classList.add("chance-of-precip");

    const uvIndex = document.createElement("p");
    uvIndex.classList.add("uv-index");

    const sunContainer = document.createElement("div");
    sunContainer.classList.add("sun-container");

    const sunRise = document.createElement("p");
    sunRise.classList.add("sunrise");

    const sunSet = document.createElement("p");
    sunSet.classList.add("sunset");

    const highLowContainer = document.createElement("div");
    highLowContainer.classList.add("high-low-container");

    const highTemp = document.createElement("p");
    highTemp.classList.add("high-temp");

    const lowTemp = document.createElement("p");
    lowTemp.classList.add("low-temp");

    highLowContainer.appendChild(highTemp);
    highLowContainer.appendChild(lowTemp);

    sunContainer.appendChild(sunRise);
    sunContainer.appendChild(sunSet);

    moreDetailsContainer.appendChild(humidityInfo);
    moreDetailsContainer.appendChild(windInfo);
    moreDetailsContainer.appendChild(chanceOfPrecip);
    moreDetailsContainer.appendChild(uvIndex);

    conditionsContainer.appendChild(tempInfo);
    conditionsContainer.appendChild(feelsLike);
    conditionsContainer.appendChild(conditionIcon);
    conditionsContainer.appendChild(conditionInfo);

    locationContainer.appendChild(locationName);
    locationContainer.appendChild(locationCountry);
    locationContainer.appendChild(lastUpdated);

    weatherContainer.appendChild(locationContainer);
    weatherContainer.appendChild(conditionsContainer);
    weatherContainer.appendChild(moreDetailsContainer);
    weatherContainer.appendChild(sunContainer);
    weatherContainer.appendChild(highLowContainer);
  }
}
