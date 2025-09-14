import { renderWeather } from "./DOMcontrol";

const apiKey = "PXQFNBZNYHV8EHVDGVMEA8SWR";

export async function fetchWeatherData(location, includeDays = false) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}${
    includeDays ? "&include=days" : ""
  }`;

  console.clear();

  const response = await fetch(url, {
    method: "GET",
    headers: {},
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// export function getWeatherData(location) {
//   fetchWeatherData(location)
//     .then((data) => {
//       const {
//         datetime,
//         temp,
//         feelslike,
//         humidity,
//         precipprob,
//         conditions,
//         icon,
//         windspeed,
//         uvindex,
//         sunrise,
//         sunset,
//       } = data.currentConditions;

//       console.log(`Time: ${datetime}`);
//       console.log(`Temperature: ${temp}°F`);
//       console.log(`Feels Like: ${feelslike}`);
//       console.log(`Humidity: ${humidity}`);
//       console.log(`Chance of Precipitation: ${precipprob}%`);
//       console.log(`${conditions}`);
//       console.log(`${icon}`);
//       console.log(`Wind Speed: ${windspeed}`);
//       console.log(`UV Index: ${uvindex}`);
//       console.log(`Sunrise: ${sunrise}`);
//       console.log(`Sunset: ${sunset}`);
//       console.log("");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

export function getWeatherData(location) {
  fetchWeatherData(location)
    .then((data) => {
      const {
        datetime,
        temp,
        feelslike,
        humidity,
        precipprob,
        conditions,
        icon,
        windspeed,
        uvindex,
        sunrise,
        sunset,
      } = data.currentConditions;

      // Prepare the weather data object to pass to renderWeather
      const weatherData = {
        location: location,
        temp: temp,
        feelslike: feelslike,
        humidity: humidity,
        precipprob: precipprob,
        conditions: conditions,
        icon: icon,
        windspeed: windspeed,
        uvindex: uvindex,
        sunrise: sunrise,
        sunset: sunset,
      };

      // Call renderWeather to display the data
      renderWeather(weatherData);
    })
    .catch((err) => {
      console.error(err);
    });
}

export function dailyForcast(location) {
  fetchWeatherData(location, true)
    .then((data) => {
      const forecastDays = data.days;
      const fiveDayForecast = forecastDays.slice(0, 5); // only 5 days
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
