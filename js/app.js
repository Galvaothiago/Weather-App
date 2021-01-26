const input = document.querySelector('.input-custom')
const showInput = document.querySelector('.add-input')
const form = document.querySelector('[data-js="change-location"]')
const backgroudIsDay = document.querySelector('[data-js="background"]')
const weatherIconContainer = document.querySelector('[data-js="weather-icon"]')

const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherTextContainer = document.querySelector('[data-js="weather-text"]')
const temperatureContainer = document.querySelector('[data-js="temperature"]')
const lastUpdate = document.querySelector('[data-js="last-update"]')

const city = localStorage.getItem('city')

const changeBackgroundWeather = isDay => {
    if (isDay) {

        return backgroudIsDay.style.backgroundImage = "url(./src/day.png)" 
    }
    backgroudIsDay.style.backgroundImage = "url(./src/night3.jpg)"
}

const getWeatherInfo = async inputValue => {
    const [{ WeatherText, Temperature, WeatherIcon, IsDayTime, LocalObservationDateTime}] = await getWeatherData(inputValue)
    const { LocalizedName } = await getCityData(inputValue)
    const { AdministrativeArea } = await getCityData(inputValue)

    const lastUpdateGetWeatherHours = LocalObservationDateTime.split('T')[1].split('-')[0]

    cityNameContainer.textContent = `${ LocalizedName.toUpperCase() }, ${ AdministrativeArea.LocalizedName.toUpperCase() }`
    weatherTextContainer.textContent = WeatherText
    temperatureContainer.textContent = Temperature.Metric.Value
    lastUpdate.innerHTML = `Ultima coleta: ${lastUpdateGetWeatherHours}`

    changeBackgroundWeather(IsDayTime)

    weatherIconContainer.src = `./src/icon/${WeatherIcon}.svg`
}


window.addEventListener('load', () => {

    if (!city) {
        getWeatherInfo('Vinhedo')
    }
})

showInput.addEventListener('click', () => {
    input.classList.remove('d-none')
    input.focus()
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const inputValue = e.target.city.value.trim()

    getWeatherInfo(inputValue)
    form.reset()
    input.classList.add('class', 'd-none')

    localStorage.setItem('city', inputValue)   
})



if (city) {
    getWeatherInfo(city)
}

console.log('oi')