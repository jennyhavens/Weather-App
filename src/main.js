import "./styles.css";
import { getWeatherData } from "./weather-data";
import { DOMcontrol } from "./DOMcontrol";
import { renderWeather } from "./DOMcontrol";

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const modeLabel = document.getElementById("mode-label");

  window.modeToggle = modeToggle;
  window.modeLabel = modeLabel;

  modeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("night-mode");
      modeLabel.textContent = "Night";
    } else {
      document.body.classList.remove("night-mode");
      modeLabel.textContent = "Day";
    }
  });
});

getWeatherData;
renderWeather;

DOMcontrol();
