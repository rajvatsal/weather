import { on, off, emit } from "./scripts/pub-sub.js";
import "./css/styles.css";
import "./scripts/API.js";

emit("WeatherRq", "india");
on("WeatherFf", console.log);
