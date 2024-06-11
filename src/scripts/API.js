import { on, off, emit } from "./pub-sub.js";
import { format, add, compareAsc } from "date-fns";

const apiKey = "c28feb593b624c9d98545005240906";
const baseUrl = "http://api.weatherapi.com/v1";
const fd = (dt) => format(dt, "yyyy-MM-dd");
const apiMethods = {
	location: "41.926701,8.736900",
	days: 5,
	async currentWeather(location = this.location) {
		const method = "/current.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async forecast(days = this.days, location = this.location) {
		const method = "/forecast.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}&days=${days}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async autocomplete(location = "cors") {
		const method = "/search.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async history(dt = "2024-08-15", location = this.location) {
		const data = dt.split("-");
		try {
			if (data[0] < 2010 || data[1] < 1 || data[2] < 1)
				throw new Error('Date cannot be less than "2010-01-01"');
		} catch (err) {
			return console.error(err);
		}
		const method = "/history.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}&dt=${dt}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async marine(tides = "no", location = this.location) {
		const method = "/marine.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}&tides=${tides}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async future(dt = add(new Date(), { days: 14 }), location = this.location) {
		try {
			if (compareAsc(add(new Date(), { days: 14 }), dt) === 1)
				throw new Error(
					"Date cannot be less than 14 days from the current date",
				);
			if (compareAsc(dt, add(new Date(), { days: 300 })) === 1)
				throw new Error(
					"Date cannot be more than 300 days from the current date",
				);
		} catch (err) {
			return console.error(err);
		}
		const method = "/future.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}&dt=${fd(dt)}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async timeZone(location = this.location) {
		const method = "/timezone.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async sports(location = this.location) {
		const method = "/sports.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async astronomy(location = this.location) {
		const method = "/astronomy.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=${location}`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
	async ipLookup() {
		const method = "/ip.json";
		const url = `${baseUrl}${method}?key=${apiKey}&q=auto:ip`;
		const response = await fetch(url, { mode: "cors" });
		return response.json();
	},
};

async function getWeather(location) {
	const response = await apiMethods.currentWeather(location);
	try {
		if (response.error) throw new Error(response.error.message);
	} catch (err) {
		console.error(err);
		return emit("WeatherError", err);
	}
	const loc = response.location;
	const { name, region, tz_id } = loc;
	const temp_c = response.current.temp_c;
	const condition = response.current.condition;
	emit("WeatherFf", { temp_c, name, region, tz_id, condition });
}

on("WeatherRq", getWeather);
