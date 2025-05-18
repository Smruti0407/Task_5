const apiKey = '55e4137127f0afba1cea1e27cecf63ef'; // Your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Geolocation permission denied.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('weatherResult');
      if (data.cod === 200) {
        resultDiv.innerHTML = `
          <div class="weather-card">
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>🌡️ <strong>${data.main.temp}°C</strong></p>
            <p>☁️ ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind: ${data.wind.speed} m/s</p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<p>❌ City not found. Try again.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      document.getElementById('weatherResult').innerHTML = `<p>⚠️ Error getting weather data.</p>`;
    });
}