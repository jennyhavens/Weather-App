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
}
