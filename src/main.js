import "./styles.css";
import { getWeatherData } from "./weather-data";
import { DOMcontrol } from "./DOMcontrol";

async function reverseGeocode(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10`
  );
  const data = await response.json();
  return data.display_name || `${lat},${lon}`;
}

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

  const lastLocation = localStorage.getItem("lastLocation");
  const lastDisplayAddress = localStorage.getItem("lastDisplayAddress");
  if (lastLocation) {
    getWeatherData(lastLocation, lastDisplayAddress);
    const locationInput = document.getElementById("location");
    if (locationInput) locationInput.value = lastDisplayAddress || lastLocation;
  }

  const useLocationBtn = document.getElementById("use-location-btn");
  if (useLocationBtn) {
    useLocationBtn.addEventListener("click", async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Reverse geocode to get a human-readable address
            const address = await reverseGeocode(latitude, longitude);
            // Fetch weather using coordinates, but pass the address as a second argument
            getWeatherData(`${latitude},${longitude}`, address);
            localStorage.setItem("lastLocation", `${latitude},${longitude}`);
            localStorage.setItem("lastDisplayAddress", address);
          },
          (_error) => {
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    });
  }

  DOMcontrol();
});
