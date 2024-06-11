import { on, off, emit } from "./pub-sub.js";

const display = document.querySelector(".display-info");

function displayInfo(info) {
	const content = `
    <h1>${info.name}</h1>
    <h2>${info.region}</h2>
    <h3>${info.condition.text} <img src="${info.condition.icon}" /></h3>
    <p>Temperature: ${info.temp_c}°C</p>
    <p>Timezone: ${info.tz_id}</p>
`;
	display.innerHTML = content;
}

function displayError(err) {
	const content = `
    <h1 class="error">${err}</h1>
`;
	display.innerHTML = content;
}

on("WeatherFf", displayInfo);
on("WeatherError", displayError);

emit("WeatherRq");
