function getWeather(){
    const apikey = "c14a412d4bdee1f8a117f6e1de936c69"
    const selectedCity = document.querySelector("#city").value
    console.log(selectedCity)
    if (!selectedCity){
        alert('Please enter a city')
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apikey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather', error);
            alert('Error fetching current weather. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayHourlyForecast(data);
        })
        .catch(error => {
            console.error('Error fetching houry forecast', error);
            alert('Error fetching hourly forecast. Please try again.');
        });
    
}

function displayWeather(data){
    const tempInfo = document.querySelector("#temperature")
    const weatherInfo = document.querySelector("#weatherInfo")
    const weatherIcon = document.querySelector("#weather-icon")
    const hourlyForecast = document.querySelector("#hourlyForecast")

    tempInfo.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';

    if (data.cod === '404'){
        weatherInfo.innerHTML = `<p>${data.message}</p>`
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const tempRetrievedHtml = `<p>${temperature}</p>`;
        const weatherRetrievedHtml = `
        <p>${cityName}</p>
        <p>${description}</p>`;
        tempInfo.innerHTML = tempRetrievedHtml;
        weatherInfo.innerHTML = weatherRetrievedHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();
    }

    
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastData = document.getElementById("hourlyForecast");
    const next24Hours = hourlyData.list.slice(0, 8);

    
    next24Hours.forEach(item => {
    const dateItem = new Date(item.dt * 1000);
    const dateHours = new Date(item.dt_txt)
    let hours = dateHours.getHours();

    // Determine AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    const formattedTime = `${hours} ${amPm}`;
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`
        const hourlyItemHtml = `
            <div id="hourly-item">
                <span id="dateText">${formattedTime}</span>
                <img src="${iconUrl}" id="hourlyImage" alt="Hourly weather icon">
                <span>${temperature}°C</span>
            </div>
        `
        hourlyForecastData.innerHTML += hourlyItemHtml;
        
    })
    showImageHourly();
}

function showImage(){
    const weatherItemIcon = document.querySelector("#weather-icon")
    weatherItemIcon.style.display = 'block';
}

function showImageHourly(){
    const hourlyItemIcon = document.querySelector("#hourlyForecast")
    const imageForecast = document.querySelectorAll("#hourlyImage")
    const dateTextItem = document.querySelectorAll("#dateText")
    hourlyItemIcon.style.display = 'flex';
    const hourlyItemAlign = document.querySelectorAll("#hourly-item")
    hourlyItemAlign.forEach(item => {
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'flex-start';
        item.style.marginRight = '15px';
    });
    imageForecast.forEach(element => {
        element.style.marginLeft = '-9px'
    });
    dateTextItem.forEach(element => {
        element.style.marginLeft = '2px'
        
    });
    

}