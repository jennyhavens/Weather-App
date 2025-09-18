import { renderWeather } from "./DOMcontrol";

const apiKey = "PXQFNBZNYHV8EHVDGVMEA8SWR";

export async function fetchWeatherData(location, includeDays = false) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?&key=${apiKey}${
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

export function getWeatherData(location) {
  fetchWeatherData(location)
    .then((data) => {
      const {
        resolvedAddress,
        currentConditions: {
          datetime,
          temp,
          feelslike,
          humidity,
          precipprob,
          conditions,
          windspeed,
          sunrise,
          sunset,
        },
        days,
      } = data;

      // Deconstruct days array to get needed info for 5 day forecast
      const deconstructedDays = days.map(
        ({ datetime, tempmax, tempmin, conditions, precip }) => ({
          dayOfWeek: getDaysOfWeek(datetime),
          formattedDate: formatDate(datetime),
          tempmax: Math.round(tempmax),
          tempmin: Math.round(tempmin),
          conditions,
          precip: Math.round(precip),
        })
      );

      // Helper functions for formatting date and time
      function formatDateTimeFromString(datetime) {
        let hours = 0,
          minutes = 0,
          seconds = 0;
        let now = new Date();

        if (datetime.includes("T")) {
          const [, timePart] = datetime.split("T");
          [hours, minutes, seconds] = timePart.split(":").map(Number);
        } else {
          [hours, minutes, seconds] = datetime.split(":").map(Number);
        }

        const dateTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          seconds || 0
        );

        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };

        return new Intl.DateTimeFormat("en-US", options).format(dateTime);
      }

      function formatDate(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);

        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}`;
      }

      function formattedTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);

        const options = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
      }

      function getDaysOfWeek(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = date.getDay();

        return daysOfWeek[dayOfWeek];
      }

      // Prepare the weather data object to pass to renderWeather
      const weatherData = {
        location: resolvedAddress,
        lastUpdated: formatDateTimeFromString(datetime),
        temp: Math.round(temp),
        feelslike: Math.round(feelslike),
        humidity: Math.round(humidity),
        precipprob: Math.round(precipprob),
        conditions: conditions,
        windspeed: windspeed,
        sunrise: formattedTime(sunrise),
        sunset: formattedTime(sunset),
        days: deconstructedDays, // array of days with datetime, tempmax, tempmin
      };

      // Call renderWeather to display the data
      renderWeather(weatherData);
    })
    .catch((err) => {
      console.error(err);
    });
}

getWeatherData();
