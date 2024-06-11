import { on, off, emit } from "./pub-sub.js";

const display = document.querySelector(".display-info");
const body = document.querySelector("body");

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

function displayLoadingScreen() {
	display.innerHTML = "LOADING...";
}

function changeBackground(info) {
	const weather = info.condition.text;
	let cls;

	switch (weather.toLowerCase()) {
		case "sunny":
			cls = "sunny";
			break;
		case "partly cloudy":
			cls = "cloudy";
			break;
		case "cloudy":
			cls = "cloudy";
			break;
		case "rain":
			cls = "rain";
			break;
		case "light rain":
			cls = "light-rain";
			break;
		case "mist":
			cls = "cloudy";
			break;
		case "clear":
			cls = "clear";
			break;
		case "patchy rain nearby":
			cls = "light-rain";
			break;
	}

	body.setAttribute("class", cls);
}

on("WeatherFf", changeBackground);
on("WeatherRq", displayLoadingScreen);
on("WeatherFf", displayInfo);
on("WeatherError", displayError);

emit("WeatherRq");
