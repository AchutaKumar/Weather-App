const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const notFound = document.querySelector('.not-found')
const searchCity = document.querySelector('.search-city')
const weatherSection = document.querySelector('.weather-section')

const stateTxt = document.querySelector('.state')
const tempTxt = document.querySelector('.temp')
const conditionTxt = document.querySelector('.condition')
const humidityTxt = document.querySelector('.hum-val')
const windTxt = document.querySelector('.wind-val')
const dateTxt = document.querySelector('.date') 

const apiKey='4661e6f95077f4e691242e46e332c141'

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherValue(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherValue(cityInput.value)        
        cityInput.value = ''
        cityInput.blur()
    }
    // console.log(e);
})

async function getfetchData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiurl)

    return response.json()
}

async function updateWeatherValue(city){
    const weatherData = await getfetchData(city)

    if (weatherData.cod != '200'){
        showdisplaySection(notFound)
        return
    }
    
    const {
        name:country,
        main:{temp , humidity},
        weather:[{id,main}],
        wind:{speed}
    } = weatherData

    stateTxt.textContent = country
    tempTxt.textContent = temp + '°C'
    humidityTxt.textContent = humidity+'%'
    windTxt.textContent = speed+'/s'
    let today = new Date();

    dateTxt.textContent = today.toDateString()
    showdisplaySection(weatherSection)
    // console.log(weatherData);
}

function showdisplaySection(section){
    [notFound,searchCity,weatherSection].forEach(section=>{
        section.style.display = 'none'
    })

    section.style.display = 'block'
}

