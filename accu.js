
const apiKey = '98AOsgSnks0lZjHn5RiFy9JlXmTnDRbe';
const cityUrl = "https://dataservice.accuweather.com/locations/v1/cities/search";
const weatherUrl = "https://dataservice.accuweather.com/currentconditions/v1/";

document.getElementById('locationForm').addEventListener('submit', function (event) 
{
    event.preventDefault();
    const location = document.getElementById('location').value;
    getLocationData(location);
});

function getLocationData(location) 
{
    const locationUrl = `${cityUrl}?apikey=${apiKey}&q=${location}`;

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) 
            {
                alert('Location not found. Please enter a valid location.');
                return;
            }
            const locationId = data[0].Key;
            getWeatherForecast(locationId);
        })
        .catch(error => console.error('Error fetching location data:', error));
}

function getWeatherForecast(locationId) 
{
    const weatherUrlWithKey = `${weatherUrl}${locationId}?apikey=${apiKey}`;

    fetch(weatherUrlWithKey)
        .then(response => response.json())
        .then(weatherData =>
        {
            if (weatherData.length === 0) 
            {
                alert('Weather data not available for this location.');
                return;
            }
            console.log(weatherData);
            displayWeatherInfo(weatherData[0]);
            const isDayTime = weatherData[0].IsDayTime;
            displayDayNightIcon(isDayTime);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherInfo(weatherData) 
{
    const weatherContainer = document.getElementById('weatherInfo');
    const observationTime = weatherData.LocalObservationDateTime;
    const weatherText = weatherData.WeatherText;
    const temperatureMetric = weatherData.Temperature.Metric.Value;
    const temperatureImperial = weatherData.Temperature.Imperial.Value;
    const weatherHtml = `
        <h2>Weather Information</h2>
        <div class="info-box">
            <p>Weather: </p>
            <p style="margin-left: 10px;"> ${weatherText}</p>
        </div>
        <div class="info-box">
            <p>Temperature in °C: </p>
            <p style="margin-left: 10px;"> ${temperatureMetric} °C</p>
        </div>
        <div class="info-box">
            <p>Temperature in °F: </p>
            <p style="margin-left: 10px;"> ${temperatureImperial} °F</p>
        </div>
    `;

    weatherContainer.innerHTML = weatherHtml;
    updateWeatherIcon(weatherData);
}
function updateWeatherIcon(weatherData) 
{
    const weatherIcon = document.getElementById('weatherIcon');
    const iconCode = weatherData.WeatherIcon; 
    const iconURL = getIconURL(iconCode);

    if (iconURL) 
    {
        weatherIcon.src = 'images/' + iconURL;
    } else 
    {
        weatherIcon.src = 'images/01-s.png';
    }
}


function getIconURL(weatherCode) 
{
    console.log(weatherCode);
    const iconMappings = 
    {
        1: '01-s.png',
        2: '02-s.png',
        3: '03-s.png',
        4: '04-s.png',
        5: '05-s.png',
        6: '06-s.png',
        7: '07-s.png',
        8: '08-s.png',
        11: '11-s.png',
        12: '12-s.png',
        13: '13-s.png',
        14: '14-s.png',
        15: '15-s.png',
        16: '16-s.png',
        17: '17-s.png',
        18: '18-s.png',
        19: '19-s.png',
        20: '20-s.png',
        21: '21-s.png',
        22: '22-s.png',
        23: '23-s.png',
        24: '24-s.png',
        25: '25-s.png',
        26: '26-s.png',
        29: '29-s.png',
        30: '30-s.png',
        31: '31-s.png',
        32: '32-s.png',
        33: '33-s.png',
        34: '34-s.png',
        35: '35-s.png',
        36: '36-s.png',
        37: '37-s.png',
        38: '38-s.png',
        39: '39-s.png',
        40: '40-s.png',
        41: '41-s.png',
        42: '42-s.png',
        43: '43-s.png',
        44: '44-s.png'
    };
    
    return iconMappings[weatherCode];
}

function displayDayNightIcon(isDayTime) 
{
    const dayNightImage = document.getElementById('dayNightImage');
    dayNightImage.style.backgroundImage = `url('${isDayTime ? 'day.svg' : 'night.svg'}')`;
    dayNightImage.style.opacity = 1;
}
const contactLink = document.getElementById('contact-link');

contactLink.addEventListener('click', function() 
{
    window.location.href = 'mailto:areebasattar23@gmail.com';
});