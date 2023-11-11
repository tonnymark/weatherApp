const apiKey = 'df8500966abdb373750f81abc93108c5';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const cityName = document.querySelector('.search input');
const button = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather img');
const cityInput = document.querySelector('.enter-city p');
const tempMax = document.getElementById('high');
const tempMin = document.getElementById('low');
const weatherType = document.querySelector('.weather-description');

// fetching the weather api using asych  function

async function getWeatherApi(lookupCity) {
  const response = await fetch(apiUrl + lookupCity + `&appid=${apiKey}`);
  if (response.status === 400) {
    // display the info to enter a city name
    cityInput.style.display = 'block';

    // document.querySelector("..weather-box").style.display
  } else {
    const data = await response.json();

    //   changing weaather icons based on the weather

    if (data.weather[0].main == 'Clear') {
      weatherIcon.src = './Images/clear.png';
    } else if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = './Images/clouds.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = './Images/rain.png';
    } else if (data.weather[0].main == 'Snow') {
      weatherIcon.src = './Images/snow.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = './Images/Mist.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = './Images/drizzle.png';
    }

    const temprature = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.humid-scale');
    const windSpeed = document.querySelector('.wind-speed');

    city.innerHTML = data.name;
    temprature.innerHTML = Math.round(data.main.temp) + '°';
    humidity.innerHTML = data.main.humidity + '%';
    windSpeed.innerHTML = data.wind.speed + ' mph';
    tempMax.innerHTML = 'H:' + Math.round(data.main.temp_max) + '&deg;';
    tempMin.innerHTML = 'L:' + Math.round(data.main.temp_min) + '&deg;';
    weatherType.innerHTML = data.weather[0].main;
    //   setting display properties

    cityInput.style.display = 'none';
    document.querySelector('.weather-box').style.display = 'block';
  }
}

button.addEventListener('click', () => {
  getWeatherApi(cityName.value);
});
