//buttons
const searchBtn = document.getElementById('searchBtn');
//input
const inputSearch = document.getElementById('search');

//contenido
var resultIcon = document.getElementById('temp-icon')

var characteristicsUl = document.getElementById('show-result');
var savedResultsField = document.querySelector('.last-results > p');
var resultField = document.querySelector('.actual-result');

var temperature = document.getElementById('temp')
var cityName = document.getElementById('city-name')
var feelsLike = document.getElementById('feels-like')
var date = document.getElementById('date')
var sunset = document.getElementById('sunset')
var humidity = document.getElementById('humidity')
var description = document.getElementById('description')

//funciones
function get(url) {
    return fetch(url);
}
//key
const apiKey = "4fa351655b4244afa0ede32f61fa9e0c";
//basePath
const basePath = `https://api.weatherbit.io/`;
const baseUrl = new URL (`v2.0/current`, basePath);

//renderizar mapa

//poner mark
//desahecer mark
//panear sitio

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const city = inputSearch.value

    baseUrl.searchParams.set('key', apiKey);
    baseUrl.searchParams.set('city', city)

    get(baseUrl)
    .then(response => response.json())
    .then( data => {
        console.log(data)
        let result = data.data[0]
        temperature.textContent = `${result.temp}c`
        temperature.style.fontSize = '40px'
        temperature.style.fontWeight = 'bold'
        cityName.textContent = result.city_name
        feelsLike.textContent = `Feels like: ${result.app_temp}`
        date.textContent = result.datetime
        sunset.textContent = `Sunset at: ${result.sunset}`
        humidity.textContent = `Humidity: ${result.rh}`
        description.textContent = result.weather.description

        let icon = result.weather.icon
        resultIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`
        
        return [result.temp, result.city_name, result.weather.icon]
    })
    .then ( savedResults => {
        let savedTempIcon = document.createElement('img')
        let savedTemp = document.createElement('p')
        let savedCity = document.createElement('p')

        savedResultsField.appendChild(savedTempIcon)
        savedResultsField.appendChild(savedTemp)
        savedResultsField.appendChild(savedCity)
        savedResultsField.style.display = 'flex'
        savedResultsField.style.flexDirection = 'column'
        savedResultsField.style.alignItems = 'center'

        savedTempIcon.src = savedResults[2]
        savedTemp.textContent = savedResults[0]
        savedCity.textContent = savedResults[1]
    })
})
