var cityFormEl = $("#city-form");
var cityListEl = $("#city-list");
var currentDate = moment().format("M/DD/YYYY");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHum = $("#current-hum");
var currentUv = $("#current-uv");
var day1 = $("#day0");
var day2 = $("#day1");
var day3 = $("#day2");
var day4 = $("#day3");
var day5 = $("#day4");
var searchBtn = $("#serch-btn");

var key = "bfe4c6b0b80c5629d680df228c7a85c5";
var basicUrl = "https://api.openweathermap.org/data/2.5/"
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=" + key; 
// var key = "abb27ab7b2c1aa8f64f406b7390718bd";
// var key = "0d31713b1ec6d162386c616d47247daf";
var cityName;
var latit;
var longit;
var cityHistory =[];



function listOfCities(){
  var cityList = localStorage.getItem("cityHistory");
  var arrCityList = JSON.parse(cityList);
  // cityHistory.concat(arrCityList);
  for (let i=0; i<arrCityList.length; i++) { 
    cityListEl.append('<li class= "list-group-item">' + arrCityList[i] + '</li>');
    cityHistory.push(arrCityList[i]);
  }
};

// create function to handle form submission
function selectCity(event) {
  event.preventDefault();
  console.log("city has been called");
  
  // select form element by its `name` attribute and get its value
  var cityName = $('input[name="city-input"]').val();

  // if there's nothing in the form entered, don't print to the page
  if (!cityName) {
    alert("Introduce a city name");
    return;
  }
  var isCityInList = false;
  for (let i=0; i<cityHistory.length; i++) {
    if(cityName.toLowerCase() === cityHistory[i].toLowerCase()) {
      isCityInList = true;
    }
    
  }
  getWeather(cityName)
  // print to the page
  if (!isCityInList){
    cityListEl.append('<li class= "list-group-item">' + cityName + '</li>');
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  }
  

  // clear the form input element
  $('input[name="city-input"]').val('');
  //create a function `getWeather` that accepts `cityName` and call +

  //TODO store city on local storage
}

//THEN I am presented with a 5-day forecast that displays the date, an icon representation 
//of weather conditions, the temperature, the wind speed, and the humidity


//funtion `getWeeather(lat, lon)`
function getWeather(cityName){
  console.log("running getweather function")

    ///lat and lon changing promies together mdevelopers network 
  var latLonByCity = `https://nominatim.openstreetmap.org/?city=${cityName}&format=json&limit=1`;
  fetch(latLonByCity)
    .then(function (response) {
      return response.json();
    })
    .then(function(dataLatLon) {
      console.log(dataLatLon);
      latit = dataLatLon[0].lat;
      longit = dataLatLon[0].lon;
      //we are chainig the fetch to the openweathermap to the nominatim fetch
      var weatherByCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${latit}&lon=${longit}&exclude=hourly,minutely&units=imperial&appid=${key}`;
      return fetch(weatherByCity)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("charging")
      var icon = data.current.weather[0].icon;
      currentCity.text(cityName + " " + currentDate + ".");
      currentCity.append(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" style="width:100px;height:100px;">`);
      currentTemp.text(data.current.temp);
      currentWind.text(data.current.wind_speed);
      currentHum.text(data.current.humidity);
      var currentUvi = data.current.uvi;
      currentUv.text(currentUvi);

      day1.empty();
      day2.empty();
      day3.empty();
      day4.empty();
      day5.empty();

      // 5day forecast(data) function
    for (let i=0; i<5; i++) {
      var nextDay = moment().add(i+1, "d").format("M/DD/YYYY");
      var fiveDay = $("#day" + i);
      fiveDay.append(`<h2>Day ${i+1} </h2>`);
      fiveDay.append(`<div>${nextDay}</div>`);
      var nextIcon = data["daily"][i].weather[0]["icon"];
      fiveDay.append(`<img src="http://openweathermap.org/img/wn/${nextIcon}@2x.png" style="width:20px;height:30px;">`);
      fiveDay.append('<div>Temperature: ' + data['daily'][i].temp.day + ' F </div>');
      fiveDay.append('<div>Wind: ' + data['daily'][i].wind_speed + ' mph </div>');
      fiveDay.append('<div>Humidity: ' + data['daily'][i].humidity + ' % </div>');
    }
    });
}




//TODO create a function `storeWeather(city)`

// Create a submit event listener on the form element
cityFormEl.on('submit', selectCity);
$(document).ready(function() {
    listOfCities();
});