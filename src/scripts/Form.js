import { on, off, emit } from "./pub-sub.js";

const input = document.querySelector("#location");
const btnGetWeather = document.querySelector("#get-weather");
const form = document.querySelector(".weather-form");

function clickHandlerGetWeather(e) {
	e.preventDefault();
	emit("WeatherRq", input.value || undefined);
}

// btnGetWeather.addEventListener("click", clickHandlerGetWeather); This shouldn't be working when you press enter on input
form.addEventListener("submit", clickHandlerGetWeather);
