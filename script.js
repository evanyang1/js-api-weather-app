const kelvinToFarenheit = (kelvin) => {
  return (kelvin - 273.15) * 9 / 5 + 32
}

// list saved cities (local storage)
if ( JSON.parse(localStorage.getItem('cities'))) {
  let initialCities = JSON.parse(localStorage.getItem('cities')) || localStorage.getItem('cities')
  initialCities.forEach(city => {
    let cityElem = document.createElement('li')
    cityElem.textContent = city
    document.getElementById('saved-cities-list').append(cityElem)
  });
}

const createWeatherDiv = (label, item) => {
  let div = document.createElement('div')
  div.innerHTML = `
    <p>${label}: ${item}</p>
  `
  document.getElementById('message-body').append(div)
}

document.getElementById('city-submit').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('city-input').value
  //console.log(city)
  fetch(`https://api.weatherapi.com/v1/current.json?key=d02a36d4df9a4cccba2225013200502&q=${city}`)
    .then(r => r.json())
    .then(res => {
      console.log(res)
      document.getElementById('city').textContent = `${res.location.name}, ${res.location.region}, ${res.location.country}`
      document.getElementById('message-body').innerHTML = ''
      createWeatherDiv('Temperature (F)', res.current.temp_f)
      createWeatherDiv('Feels Like (F)', res.current.feelslike_f)
      createWeatherDiv('Humidity', res.current.humidity)
      createWeatherDiv('Wind', `${res.current.wind_mph}mph ${res.current.wind_dir}`)
      createWeatherDiv('UV', res.current.uv)
      createWeatherDiv('Precipitation (mm)', res.current.precip_mm)
      createWeatherDiv('Description', res.current.condition.text)
      //console.log(res.weather[0.description])
      /*let description = res.weather[0].description 
      document.getElementById('temperature').textContent = `Temperature (F): ${kelvinToFarenheit(temp).toFixed(2)}`
      document.getElementById('descript').textContent = `Description: ${description}`*/
      
    })
})



document.getElementById('save-city').addEventListener('click', () => {
  let cityElem = document.createElement('li')
  cityElem.textContent = `${document.getElementById('city').textContent}`
  document.getElementById('saved-cities-list').append(cityElem)
  // local storage
  let arrCities = JSON.parse(localStorage.getItem('cities')) || []
  console.log(arrCities)
  arrCities.push(cityElem.textContent)
  localStorage.setItem('cities', JSON.stringify(arrCities))
  
})