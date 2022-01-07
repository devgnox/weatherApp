const weatherForm = document.querySelector("form");
const search = document.getElementById("search_input");
let msgOne = document.getElementById("msg");
msgOne.style.visibility = "hidden";
let weatherDesc = document.getElementById("weather_desc");
let forecastImg = document.getElementById("weather-pic");
const loadingIcon = document.getElementById("loading_icon");
const forecastTemp = document.getElementById("temperature");
const forecastPrecip = document.getElementById("precip");
const forecastHumd = document.getElementById("humd");
const forecastFeelsLike = document.getElementById("feel_Like");
const city = document.getElementById("city");
const hour = document.getElementById("hour");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingIcon.style.visibility = "visible";
  const location = search.value;
  console.log(location);
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        msgOne.style.visibility = "visible";
        msgOne.textContent = data.error;
      } else {
        loadingIcon.style.visibility = "hidden";
        msgOne.style.visibility = "hidden";
        forecastImg.src = data.forecast.weatherIcon;
        forecastTemp.textContent = data.forecast.tempt;
        forecastPrecip.textContent = data.forecast.precip;
        forecastHumd.textContent = data.forecast.humid;
        forecastFeelsLike.textContent = data.forecast.feell;
        weatherDesc.textContent = data.forecast.weather_desc;
        city.textContent = data.location;
        hour.textContent = data.forecast.dateTime.slice(-5);
        console.log(data.forecast);
        console.log(data.location);
      }
    });
  });
});
