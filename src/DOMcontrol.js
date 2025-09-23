import { getWeatherData } from "./weather-data";

const icons = require.context("./assets", false, /\.svg$/);

function getIconSrc(iconName) {
  const iconMap = {
    "clear-day": "clear-day.svg",
    "clear-night": "clear-night.svg",
    cloudy: "cloudy.svg",
    fog: "fog.svg",
    hail: "hail.svg",
    "partly-cloudy-day": "partly-cloudy-day.svg",
    "partly-cloudy-night": "partly-cloudy-night.svg",
    "rain-snow-showers-day": "rain-snow-showers-day.svg",
    "rain-snow-showers-night": "rain-snow-showers-night.svg",
    "rain-snow": "rain-snow.svg",
    rain: "rain.svg",
    "showers-day": "showers-day.svg",
    "showers-night": "showers-night.svg",
    sleet: "sleet.svg",
    "snow-showers-day": "snow-showers-day.svg",
    "snow-showers-night": "snow-showers-night.svg",
    snow: "snow.svg",
    "thunder-rain": "thunder-rain.svg",
    "thunder-showers-day": "thunder-showers-day.svg",
    "thunder-showers-night": "thunder-showers-night.svg",
    thunder: "thunder.svg",
    wind: "wind.svg",
    "arrow-down-bold": "arrow-down-bold.svg",
    "arrow-up-bold": "arrow-up-bold.svg",
    "moon-waxing-crescent": "moon-waxing-crescent.svg",
    water: "water.svg",
  };
  const fileName = iconMap[iconName] || "sunny.svg";
  return icons(`./${fileName}`);
}

let originalWeatherData = {};
let currentUnit = "F";

export function DOMcontrol() {
  const mainContainer = document.querySelector(".main-container");
  const headerContainer = document.querySelector(".header-container");

  const headerTitle = document.createElement("header");
  headerTitle.innerHTML = 'Weather<span class="weather-app-color">App</span>';
  headerTitle.classList.add("header-title");

  const weatherSearch = document.getElementById("weatherSearch");

  weatherSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = document.getElementById("location").value;
    getWeatherData(location);
  });

  const degreesContainer = document.createElement("div");
  degreesContainer.classList.add("degrees-container");

  const fahrenheitBtn = document.createElement("button");
  fahrenheitBtn.textContent = "F°";
  fahrenheitBtn.setAttribute("title", "Switch to Fahrenheit");
  fahrenheitBtn.classList.add("fahrenheit-button");
  fahrenheitBtn.classList.add("active-unit");

  const celsiusBtn = document.createElement("button");
  celsiusBtn.textContent = "C°";
  celsiusBtn.setAttribute("title", "Switch to Celsius");
  celsiusBtn.classList.add("celsius-button");

  fahrenheitBtn.addEventListener("click", () => {
    currentUnit = "F";
    fahrenheitBtn.classList.add("active-unit");
    celsiusBtn.classList.remove("active-unit");
    renderWeather(originalWeatherData);
  });

  celsiusBtn.addEventListener("click", () => {
    currentUnit = "C";
    celsiusBtn.classList.add("active-unit");
    fahrenheitBtn.classList.remove("active-unit");
    renderWeather(originalWeatherData);
  });

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-container");

  headerContainer.appendChild(headerTitle);

  degreesContainer.appendChild(fahrenheitBtn);
  degreesContainer.appendChild(celsiusBtn);

  mainContainer.appendChild(degreesContainer);
  mainContainer.appendChild(weatherContainer);
}

export function renderWeather(weatherData) {
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.innerHTML = "";

  const locationInput = document.getElementById("location");
  if (locationInput) {
    locationInput.value = weatherData.location;
  }

  //Render current weather
  const currentWeatherContainer = document.createElement("div");
  currentWeatherContainer.classList.add("current-weather-container");

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
  conditionIcon.classList.add("icon");
  conditionIcon.src = getIconSrc(weatherData.icon);

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

  const sunRiseIcon = document.createElement("img");
  sunRiseIcon.setAttribute("title", "Sunrise");
  sunRiseIcon.classList.add("sunrise-icon", "icon");
  sunRiseIcon.src = getIconSrc("sunny");

  const sunSet = document.createElement("p");
  sunSet.classList.add("sunset");

  const sunSetIcon = document.createElement("img");
  sunSetIcon.setAttribute("title", "Sunset");
  sunSetIcon.classList.add("sunset-icon", "icon");
  sunSetIcon.src = getIconSrc("moon-waxing-crescent");

  const highLowContainer = document.createElement("div");
  highLowContainer.classList.add("high-low-container");

  const highLowTitle = document.createElement("p");
  highLowTitle.classList.add("high-low-title");
  highLowTitle.textContent = "High and Low Temperatures";

  const highTemp = document.createElement("p");
  highTemp.classList.add("high-temp");

  const highTempIcon = document.createElement("img");
  highTempIcon.setAttribute("title", "High Temperature");
  highTempIcon.classList.add("high-temp-icon", "icon");
  highTempIcon.src = getIconSrc("arrow-up-bold");

  const lowTemp = document.createElement("p");
  lowTemp.classList.add("low-temp");

  const lowTempIcon = document.createElement("img");
  lowTempIcon.setAttribute("title", "Low Temperature");
  lowTempIcon.classList.add("low-temp-icon", "icon");
  lowTempIcon.src = getIconSrc("arrow-down-bold");

  lowTemp.append(
    `${convertTemperature(weatherData.days[0].tempmin).toFixed(
      0
    )}°${currentUnit}`
  );
  highTemp.append(
    `${convertTemperature(weatherData.days[0].tempmax).toFixed(
      0
    )}°${currentUnit}`
  );

  highLowContainer.appendChild(lowTemp);
  highLowContainer.appendChild(lowTempIcon);
  highLowContainer.appendChild(highTemp);
  highLowContainer.appendChild(highTempIcon);
  highLowContainer.appendChild(highLowTitle);

  sunSet.append(` ${weatherData.sunset}`);
  sunRise.append(` ${weatherData.sunrise}`);

  sunContainer.appendChild(sunSet);
  sunContainer.appendChild(sunSetIcon);
  sunContainer.appendChild(sunRise);
  sunContainer.appendChild(sunRiseIcon);
  sunContainer.appendChild(sunTitle);

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
    dayConditionIcon.classList.add("icon");
    dayConditionIcon.src = getIconSrc(day.icon);

    const dayTempMax = document.createElement("p");
    dayTempMax.classList.add("day-temp-max");
    dayTempMax.textContent = `${convertTemperature(day.tempmax).toFixed(
      0
    )}°${currentUnit}`;

    const dayTempMin = document.createElement("p");
    dayTempMin.classList.add("day-temp-min");
    dayTempMin.textContent = `${convertTemperature(day.tempmin).toFixed(
      0
    )}°${currentUnit}`;

    const dayConditions = document.createElement("p");
    dayConditions.classList.add("day-conditions");
    dayConditions.textContent = `${day.conditions}`;

    const dayPrecip = document.createElement("p");
    dayPrecip.classList.add("day-precip");

    const dayPrecipIcon = document.createElement("img");
    dayPrecipIcon.setAttribute("title", "Chance of Precipitation");
    dayPrecipIcon.classList.add("day-precip-icon", "icon");
    dayPrecipIcon.src = getIconSrc("water");
    dayPrecipIcon.width = 22;

    dayPrecip.appendChild(dayPrecipIcon);
    dayPrecip.append(`${day.precip}%`);

    dayContainer.appendChild(dayOfWeek);
    dayContainer.appendChild(dateOfDay);
    dayContainer.appendChild(dayTempMax);
    dayContainer.appendChild(dayTempMin);
    dayContainer.appendChild(dayConditionIcon);
    dayContainer.appendChild(dayConditions);
    dayContainer.appendChild(dayPrecip);

    forecastContainer.appendChild(dayContainer);

    forecastTitleContainer.appendChild(forecastTitle);

    weatherContainer.appendChild(forecastTitleContainer);
    weatherContainer.appendChild(forecastContainer);
  });
}
