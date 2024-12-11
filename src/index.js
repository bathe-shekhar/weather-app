import "./style.css";

import clearDay from "./img/icons/clear-day.svg";

const welcomeMsg = document.querySelector(".welcome");
const cityName = document.querySelector(".city-name");
const cityDesc = document.querySelector(".city-desc");
const cityTemp = document.querySelector(".city-temp");
const cityHumidity = document.querySelector(".city-humidity");
const weatherIcon = document.querySelector(".weather-icon");

cityName.textContent = "Loading..."

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/pune?unitGroup=metric&include=days&key=9V7A56FHHVBK8LSRNELUF74BF&contentType=json')
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
        cityTemp.textContent = "Temperature: " + response.days[0].temp;
        cityHumidity.textContent = "Humidity: " + response.days[0].humidity;
        if (response.days[0].conditions == "Clear") {
            console.log("this.....");
            const myIcon = new Image();
            myIcon.src = clearDay;
            weatherIcon.appendChild(myIcon);
            console.log(weatherIcon.src);
        }
    });


