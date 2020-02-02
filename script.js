document.getElementById('city-submit').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('city-input').value
  //console.log(city)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b2c91f8d3c1ab430050a602b2518ffbb`)
    .then(r => r.json())
    .then(res => {
      console.log(res)
    })
})