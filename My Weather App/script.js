let city = "Lahore";
let searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
	let inputValue = document.querySelector("#search").value.trim();

	if (!inputValue) {
		alert("Please enter a city name.");
		return;
	}

	if (/\d/.test(inputValue)) {
		alert("City name cannot contain numbers.");
		return;
	}

	if (!/^[a-zA-Z\s.'-]+$/.test(inputValue)) {
		alert("Please enter a valid city name.");
		return;
	}
	city = inputValue;

	getData();
})

const apiKey = "34d50117a87b22a36ca4a7a0e16a358a";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let bodyColor = document.querySelector("body");
let header = document.querySelector(".header")
let themeBtn = document.querySelector(".themeBtn");
let data = document.querySelector(".other-data");
let input = document.querySelector("input");
let searchSvg = document.querySelector(".search>svg")

function lightTheme() {
	bodyColor.style.backgroundColor = "#f0f4f9";
	bodyColor.style.color = "#101828";
	header.style.backgroundColor = "#ffffff";
	data.style.backgroundColor = "#ffffff";
	input.style.color = "#101828";
	searchSvg.style.fill = "#101828"
}

function darkTheme() {
	bodyColor.style.backgroundColor = "#0b131e";
	bodyColor.style.color = "white";
	header.style.backgroundColor = "#202b3b";
	data.style.backgroundColor = "#202b3b";
	input.style.color = "white";
	searchSvg.style.fill = "white"
}

darkTheme();

let isDarkTheme = true;

themeBtn.addEventListener("click", () => {
	if (isDarkTheme) {
		lightTheme();
		document.querySelector(".light").style.display = "none";
		document.querySelector(".dark").style.display = "flex";
	} else {
		darkTheme();
		document.querySelector(".dark").style.display = "none";
		document.querySelector(".light").style.display = "flex";
	}
	isDarkTheme = !isDarkTheme;
})

async function getData() {
	try {
		let response = await fetch(apiURL + `${encodeURIComponent(city)}&appid=${apiKey}`);

		if (!response.ok) {
			if (response.status === 404) {
				alert("City not found. Please check the city name.");
			} else {
				alert("Unable to get weather data right now.");
			}
			return;
		}

		let result = await response.json();
		let temp = document.querySelector(".temp");
		let resCity = document.querySelector(".city>h1");
		let country = document.querySelector(".city>p");
		let tempPic = document.querySelector(".temp-pic>img");
		let weatherDes = document.querySelector(".weather-description");
		let feel = document.getElementById("realFeel");
		let wind = document.getElementById("windSpeed");
		let humidity = document.getElementById("humidity");
		let pressure = document.getElementById("airPressure");

		temp.innerHTML = `${Math.floor(result.main.temp)}<sup>&deg;C</sup>`;
		resCity.innerHTML = result.name;
		country.textContent = `Country: ${result.sys.country}`;
		weatherDes.textContent = result.weather[0].description;

		if (result.weather[0].main == "Clear") {
			tempPic.src = "images/clear.png";
		}

		else if (result.weather[0].main == "Clouds") {
			tempPic.src = "images/clouds.png";
		}

		else if (result.weather[0].main == "Drizzle") {
			tempPic.src = "images/drizzle.png";
		}

		else if (result.weather[0].main == "Rain") {
			tempPic.src = "images/rain.png";
		}

		else if (result.weather[0].main == "Mist") {
			tempPic.src = "images/mist.png";
		}

		else {
			tempPic.src = "images/snow.png";
		}

		feel.innerHTML = result.main.feels_like;
		wind.innerHTML = result.wind.speed;
		humidity.innerHTML = result.main.humidity;
		pressure.innerHTML = result.main.pressure;
		 
		console.log(result);
	} catch (error) {
		alert("Unable to connect to the weather service.");
		console.error(error);
	}
}

getData()