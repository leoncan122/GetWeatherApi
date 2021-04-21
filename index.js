//buttons
const searchBtn = document.getElementById('searchBtn');
//input
const inputSearch = document.getElementById('search');

//contenido
const actualResult = document.getElementById('actual-result');
const saveResults = document.getElementById('results');

//funciones
function get(url) {
    return fetch(url);
}
//key
const apiKey = "4fa351655b4244afa0ede32f61fa9e0c";
//basePath
const basePath = `https://api.weatherbit.io/`;
const baseUrl = new URL (`v2.0/current`, basePath);


console.log(baseUrl)
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
    })
})
