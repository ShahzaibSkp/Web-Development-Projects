let city = "Lahore";
let searchBtn = document.querySelector(".search");

function formatLocalTime(dateObj) {
	let hours = dateObj.getUTCHours();
	const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;

	return `${hours}:${minutes} ${ampm}`;
}

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

let themeBtn = document.querySelector(".themeBtn");

themeBtn.addEventListener("click", () => {
	document.body.classList.toggle('light-mode');
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
		let sunrise = document.getElementById("sunrise-time");
		let sunset = document.getElementById("sunset-time");

		temp.innerHTML = `${Math.round(result.main.temp)}<sup>&deg;C</sup>`;
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

		feel.innerHTML = `${Math.round(result.main.feels_like)}<sup>&deg;C</sup>`;
		wind.innerHTML = Math.round(result.wind.speed * 3.6) + " km/h";
		humidity.innerHTML = result.main.humidity + "%";
		pressure.innerHTML = result.main.pressure + " mb";

		const timezoneOffset = result.timezone;
		const sunriseLocalTime = new Date((result.sys.sunrise + timezoneOffset) * 1000);
		const sunsetLocalTime = new Date((result.sys.sunset + timezoneOffset) * 1000);

		sunrise.innerHTML = formatLocalTime(sunriseLocalTime);
		sunset.innerHTML = formatLocalTime(sunsetLocalTime);
	} catch (error) {
		alert("Unable to connect to the weather service.");
		console.error(error);
	}
}

getData()