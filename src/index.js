import './style.css';

const API_KEY = 'b58a18c208552c88b1226af42b85906a';
const BASE_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?q='//CITY_NAME&APPID=
const BASE_GEO_URL = 'http://api.openweathermap.org/geo/1.0/reverse?'; //lat={lat}&lon={lon}&limit={limit}&appid={API key}'

async function getGeoInfo(lat, lon) {
    const response = await fetch(BASE_GEO_URL + 'lat=' + lat + '&lon=' + lon + '&limit=10&APPID=' + API_KEY, {mode: 'cors'});
    const geoInfo = await response.json();

    console.log('GEOINFO:');
    console.log(geoInfo);

    const cityField = document.getElementById('cityfield');
    const stateField = document.getElementById('statefield');

    cityField.textContent = geoInfo[0].name + ',';
    stateField.textContent = geoInfo[0].state ? geoInfo[0].state : geoInfo[0].country;
}

async function getCityInfo(city) {
    const response = await fetch(BASE_WEATHER_URL + city + '&APPID=' + API_KEY, {mode: 'cors'});
    const weather = await response.json();
    console.log('WEATHER:');
    console.log(weather);
    return weather;
}

async function citySearch() {
    const city = document.getElementById('city').value;
    const weather = await getCityInfo(city);
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;

    getGeoInfo(lat, lon);
    populateWeather(weather);
}

function populateWeather(weather) {
    //TEMPERATURE
    const tempInC = Math.round((weather.main.temp - 273.15) * 10) / 10;
    const tempInF = Math.round((((9/5) * tempInC) + 32) * 10) /10;
    
    const tempSpan = document.getElementById('temp');
    tempSpan.textContent = tempInF + "F" // (" + tempInC + "C)";

    //WEATHER DESCRIPTION/ICON
    const weatherSpan = document.getElementById('weather');
    const weatherIcon = document.getElementById('weathericon');
    const weatherIconImg = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
    weatherIcon.src = weatherIconImg;
    weatherSpan.textContent = weather.weather[0].description;

}

const searchButton = document.getElementById('search');
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    citySearch();
})



/*

**EXAMPLE**

{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}                        

*/