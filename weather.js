async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
          
          const apiKey = '3bcb199c267ff9764ee420562e7374b0';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        const weatherInfo = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Conditions: ${data.weather[0].description}</p>
        `;
        document.getElementById('weatherInfo').innerHTML = weatherInfo;
      } else {
        document.getElementById('weatherInfo').textContent = data.message;
      }
    } catch (error) {
      document.getElementById('weatherInfo').textContent = "Error fetching weather data.";
    }
  }