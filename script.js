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

document.getElementById('city-submit').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('city-input').value
  //console.log(city)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b2c91f8d3c1ab430050a602b2518ffbb`)
    .then(r => r.json())
    .then(res => {
      console.log(res)
      let {temp} = res.main, {name} = res
      document.getElementById('city').textContent = name
      //console.log(res.weather[0.description])
      let description = res.weather[0].description 
      document.getElementById('temperature').textContent = `Temperature (F): ${kelvinToFarenheit(temp).toFixed(2)}`
      document.getElementById('descript').textContent = `Description: ${description}`
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