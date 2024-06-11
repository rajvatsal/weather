import { on, off, emit } from "./pub-sub.js";

const display = document.querySelector(".display-info");

function displayInfo(info) {
	const content = `
    <h1>${info.temp_c}°</h1>
<div class="container">
<div class="location">
    <h2>${info.name}</h2>
    <h5>${info.region}</h5>
</div>
<div class="weather">
 <img src="${info.condition.icon}" />
    <h5>${info.condition.text}</h5>
</div>
</div>
`;
	// <p>Timezone: ${info.tz_id}</p>
	display.innerHTML = content;

	if (info.region === "") {
		const region = document.querySelector(".location h5");
		region.textContent = "0";
		region.style.color = "transparent";
	}
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
