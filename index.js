// Selección de elementos del DOM
const container = document.querySelector('.container'); // Contenedor principal
const search = document.querySelector('.search-box button'); // Botón de búsqueda
const weatherBox = document.querySelector('.weather-box'); // Caja de información del clima
const weatherDetails = document.querySelector('.weather-details'); // Detalles adicionales del clima
const error404 = document.querySelector('.not-found'); // Sección de mensaje de error

// Evento al hacer clic en el botón de búsqueda o al presionar Enter
search.addEventListener('click', searchWeather);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Función para buscar el clima
function searchWeather() {
    const APIKey = '921c5abc53c2790150377806dc438f3b'; // Clave de API de OpenWeatherMap
    const city = document.querySelector('.search-box input').value; // Obtener el valor de la ciudad ingresada

    if (city === '') return; // Validar que se haya ingresado una ciudad

    // Consulta a la API de OpenWeatherMap para obtener datos del clima
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Verificar si se obtuvo un error de la API (código 404)
            if (json.cod === '404') {
                // Mostrar mensaje de error y ocultar la información del clima
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn'); // Agregar animación de fadeIn al mensaje de error
                return;
            }

            // Ocultar mensaje de error si no hubo errores
            error404.style.display = 'none';
            error404.classList.remove('fadeIn'); // Remover animación de fadeIn

            // Selección de elementos para mostrar información del clima
            const image = document.querySelector('.weather-box img'); // Imagen del clima
            const temperature = document.querySelector('.weather-box .temperature'); // Temperatura
            const description = document.querySelector('.weather-box .description'); // Descripción del clima
            const humidity = document.querySelector('.weather-details .humidity span'); // Humedad
            const wind = document.querySelector('.weather-details .wind span'); // Velocidad del viento

            // Switch para seleccionar la imagen del clima según el tipo de clima
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            // Mostrar información del clima en los elementos HTML
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // Temperatura
            description.innerHTML = `${json.weather[0].description}`; // Descripción del clima
            humidity.innerHTML = `${json.main.humidity}%`; // Humedad
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; // Velocidad del viento

            // Mostrar información del clima y aplicar animación de fadeIn
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px'; // Ajustar altura del contenedor para mostrar la información completa
        });
}
