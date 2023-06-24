const apiKey = "8e5752469b1f77a6fd2996155a2586b4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").innerHTML = '<img src="images/refresh.png" class="weather-icon">';

    }else{
    
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})

checkWeather();

//Display Location
function displayLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e5752469b1f77a6fd2996155a2586b4`)
          .then(response => response.json())
          .then(data => {
            var city = data.name;
            var state = data.sys.country;
            var locationElement = document.getElementById("displayLocation");
            locationElement.innerHTML = city + ", " + state;
          })
          .catch(error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
      });
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
}
  
document.addEventListener("DOMContentLoaded", function() {
    displayLocation();
});
  