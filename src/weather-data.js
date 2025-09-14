const weatherSearch = document.getElementById("weatherSearch");

weatherSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.getElementById("location").value;
  getWeatherData(location);
  dailyForcast(location); // get 5 day forcast
});

export function getWeatherData(location) {
  const apiKey = "PXQFNBZNYHV8EHVDGVMEA8SWR";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

  console.clear();

  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const dateTime = data.currentConditions.datetime;
      const temperature = data.currentConditions.temp;
      const feelsLike = data.currentConditions.feelslike;
      const humidity = data.currentConditions.humidity;
      const precipProb = data.currentConditions.precipprob;
      const conditions = data.currentConditions.conditions;
      const condIcon = data.currentConditions.icon;
      const cloudCoverage = data.currentConditions.cloudcover;
      const sunRise = data.currentConditions.sunrise;
      const sunSet = data.currentConditions.sunset;

      console.log(`Time: ${dateTime}`);
      console.log(`Temperature: ${temperature}°F`);
      console.log(`Feels Like: ${feelsLike}`);
      console.log(`Humidity: ${humidity}`);
      console.log(`Chance of Precipitation: ${precipProb}%`);
      console.log(`${conditions}`);
      console.log(`${condIcon}`);
      console.log(`Cloud Coverage: ${cloudCoverage}%`);
      console.log(`Sunrise: ${sunRise}`);
      console.log(`Sunset: ${sunSet}`);
      console.log("");
    })
    .catch((err) => {
      console.error(err);
    });
}

export function dailyForcast(location) {
  const apiKey = "PXQFNBZNYHV8EHVDGVMEA8SWR";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&include=days`;

  console.clear();

  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const forecastDays = data.days;
      const fiveDayForecast = forecastDays.slice(0, 5); //only 5 days
      fiveDayForecast.forEach((day) => {
        console.log(`Date: ${day.datetime}`);
        console.log(`Max Temperature: ${day.tempmax}°F`);
        console.log(`Min Temperature: ${day.tempmin}°F`);
        console.log(`Conditions: ${day.conditions}`);
        console.log(`Precipitation: ${day.precip}`);
        console.log("");
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

getWeatherData();
dailyForcast();
