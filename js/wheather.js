
const APIKey = 'hGgy4FXnKxJ78dcADCf10OQANQZ4ZhRN'
const cityUrl = cityName => 
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityData = async cityName => {
    try{
        const response = await fetch(cityUrl(cityName))

        if (!response.ok) {
            throw new Error('Não foi possivel obter as informações solicitadas')
        }
        const [cityData] = await response.json()
        return cityData
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
        
    }
}

const getWeatherData = async cityName => {
    try {
        const cityKey = await getCityData(cityName)
        const result = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey.Key}?apikey=${APIKey}&language=pt-br`)

        console.log(cityKey)
        if (!result.ok) {
            throw new Error('Não foi possivel obter os dados')
        }

        return result.json()
    } catch ({ name, message }) {
        alert(`nao foi possivel obter os dados`)
}
}
