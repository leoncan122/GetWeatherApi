//buttons
const searchBtn = document.getElementById('searchBtn');
const seeWeather = document.getElementById('marker');

//input
const inputSearch = document.getElementById('search');
const inputMap = document.getElementById('map');
var countryName = document.getElementById("menu");


//contenido
var resultIcon = document.getElementById('temp-icon')

var characteristicsUl = document.getElementById('show-result');
var savedResultsField = document.querySelector('.last-results');
var resultField = document.querySelector('.actual-result');

//imprimiendo resultados
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
//baseURL
const basePath = `https://api.weatherbit.io/`;
const baseUrl = new URL (`v2.0/current`, basePath);

//longitud y latidud
let lon = -5.6704;
let lat = 40.9726;

// busqueda por input
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    var selectedCountry = countryName.options[countryName.selectedIndex].id;
    var city = inputSearch.value;
    
    baseUrl.searchParams.delete('lat')
    baseUrl.searchParams.delete('lon')
    baseUrl.searchParams.set('key', apiKey);
    baseUrl.searchParams.set('city', city);
    baseUrl.searchParams.set('country', selectedCountry);
    console.log(baseUrl)
    get(baseUrl)

    .then(response => {
        return response.json()
    })
    .then( data => {
        let result = data.data[0]
        //panear sitio
        map.panTo([result.lon, result.lat], {duration: 3500});
        
        temperature.textContent = `${result.temp}c`
        temperature.style.fontSize = '30px'
        cityName.textContent = result.city_name
        feelsLike.textContent = `Feels like: ${result.app_temp}`
        date.textContent = result.ob_time
        sunset.textContent = `Sunset at: ${result.sunset}`
        humidity.textContent = `Humidity: ${result.rh}`
        description.textContent = result.weather.description

        let icon = result.weather.icon
        resultIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`
        

        return [result.temp, result.city_name, resultIcon.src]
    })
    .then ( savedResults => {
        let savedTempIcon = document.createElement('img')
        let savedTemp = document.createElement('p')
        let savedCity = document.createElement('p')
        let pResults = document.createElement('p');


        savedResultsField.appendChild(pResults)
        pResults.appendChild(savedTempIcon)
        pResults.appendChild(savedTemp)
        pResults.appendChild(savedCity)
        
        pResults.style.display = 'flex'
        pResults.style.flexDirection = 'column'
        pResults.style.alignItems = 'center'
        let width = 90
        let height = 20
        pResults.style.height = `${height}%`
        pResults.style.width = `${width}%`

        savedTemp.style.margin = '0'
        savedCity.style.margin = '0'

        savedTempIcon.src = resultIcon.src
        savedTempIcon.style.width = '35px'
        savedTemp.textContent = savedResults[0]
        savedCity.textContent = savedResults[1]

        pResults.addEventListener('mouseover', function() {
            pResults.style.boxShadow = '3px 3px #53a7ea'
            pResults.style.webkitTransform = 'translateX(-3px)'
            pResults.style.transform = 'translateX(-3px)'
        }) 
        pResults.addEventListener('mouseout', () => {
            pResults.style.boxShadow = 'none'
            pResults.style.webkitTransform = 'none'
            pResults.style.transform = 'none'
        })
    })
})

//busqueda por el mapa
//mapa
mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmNhbjEyMiIsImEiOiJja250NDVubm8yajJwMm5wcjIyNXc1Yjl2In0.5IuZ1DxL3JD8IfDAs5Jrjw';

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 4 // starting zoom
});
//creando marcador en el mapa

map.on('click', (e) => {
    
    var marker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true
    })
    .setLngLat(e.lngLat)
    .addTo(map);
    baseUrl.searchParams.delete('city')
    baseUrl.searchParams.set('key', apiKey);
    baseUrl.searchParams.set('lon', e.lngLat.lng)
    baseUrl.searchParams.set('lat', e.lngLat.lat)
      
    map.panTo([e.lngLat.lng, e.lngLat.lat], {duration: 1000});
    
})

seeWeather.addEventListener('click', () => {
    map.zoomIn({duration: 1000});
    get(baseUrl)
    .then(response => response.json())
    .then( data => {
        let result = data.data[0]
        temperature.textContent = `${result.temp}c`
        temperature.style.fontSize = '30px'
        cityName.textContent = result.city_name
        feelsLike.textContent = `Feels like: ${result.app_temp}`
        date.textContent = result.ob_time
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
        let pResults = document.createElement('p');

        savedResultsField.appendChild(pResults)
        pResults.appendChild(savedTempIcon)
        pResults.appendChild(savedTemp)
        pResults.appendChild(savedCity)
        
        pResults.style.display = 'flex'
        pResults.style.flexDirection = 'column'
        pResults.style.alignItems = 'center'
        let width = 90
        let height = 20
        pResults.style.height = `${height}%`
        pResults.style.width = `${width}%`
        
        savedTemp.style.margin = '0'
        savedCity.style.margin = '0'

        savedTempIcon.src = resultIcon.src
        savedTempIcon.style.width = '35px'
        savedTemp.textContent = savedResults[0]
        savedCity.textContent = savedResults[1]

        pResults.addEventListener('mouseover', function() {
            pResults.style.boxShadow = '3px 3px #53a7ea'
            pResults.style.webkitTransform = 'translateX(-3px)'
            pResults.style.transform = 'translateX(-3px)'
        }) 
        pResults.addEventListener('mouseout', () => {
            pResults.style.boxShadow = 'none'
            pResults.style.webkitTransform = 'none'
            pResults.style.transform = 'none'
        })

    })
})
