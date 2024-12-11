import "./style.css";

import clearDay from "./img/icons/clear-day.svg";
import partlyCloudyDay from "./img/icons/cloudy-day-1.svg";
import coludyDay from "./img/icons/cloudy.svg";
// import partialyRainyDay from "./img/icons/rainy-1.svg";
import rainyDay from "./img/icons/rainy-5.svg";
import snowyDay from "./img/icons/snowy-5.svg";
import thunderDay from "./img/icons/thunder.svg";

const welcomeMsg = document.querySelector(".welcome");
const cityName = document.querySelector(".city-name");
const cityDesc = document.querySelector(".city-desc");
const cityTemp = document.querySelector(".city-temp");
const cityHumidity = document.querySelector(".city-humidity");
const cityVisibility = document.querySelector(".city-visibility");
const cityUVIndex = document.querySelector(".city-uvindex");
const weatherIcon = document.querySelector(".weather-icon");
const searchInput = document.querySelector("input");

cityName.textContent = "Loading..."

var city = "Pune";
var myIcon = new Image();
myIcon.src = clearDay;

function getWeatherInfo() {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=9V7A56FHHVBK8LSRNELUF74BF&contentType=json`)
        .then(function (response) {
            return (response.json());
        })
        .then(function (response) {
            console.log(response);
            console.log(response.resolvedAddress);
            console.log(response.days[0].description);
            console.log(response.days[0].temp);
            console.log(response.days[0].humidity);
            // console.log(response.resolvedAddress);
            // console.log(response.resolvedAddress);
            cityName.textContent = response.resolvedAddress;
            cityDesc.textContent = response.days[0].description;
            cityTemp.textContent = "Temperature: " + response.days[0].temp + "\u00B0C";
            cityHumidity.textContent = "Humidity: " + response.days[0].humidity + "%";
            cityVisibility.textContent = "Visibility: " + response.days[0].visibility;
            cityUVIndex.textContent = "UV Index: " + response.days[0].uvindex;
            if (response.days[0].icon == "clear-day") {
                console.log("this.....");
                myIcon.src = clearDay;
            }
            else {
                if (response.days[0].icon == "snow") {
                    myIcon.src = snowyDay;
                }
                else {
                    if (response.days[0].icon == "partly-cloudy-day" || response.days[0].icon == "partly-cloudy-night") {
                        myIcon.src = partlyCloudyDay;
                    }
                    else {
                        if (response.days[0].icon == "rain" || response.days[0].icon == "showers-day" || response.days[0].icon == "showers-night") {
                            myIcon.src = rainyDay;
                        }
                        else {
                            if (response.days[0].icon == "cloudy" || response.days[0].icon == "partly-cloudy-day" || response.days[0].icon == "partly-cloudy-night") {
                                myIcon.src = coludyDay;
                            }
                            else {
                                if (response.days[0].icon == "thunder-rain" || response.days[0].icon == "thunder-showers-day" || response.days[0].icon == "thunder-showers-night") {
                                    myIcon.src = thunderDay;
                                }
                            }
                        }
                    }

                }
            }
            weatherIcon.innerHTML = "";
            weatherIcon.appendChild(myIcon);
            console.log(weatherIcon.src);

        });

}

searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        city = searchInput.value;
        getWeatherInfo();
    }
});

getWeatherInfo();