var cityFormEl = $("#city-form");
var cityListEl = $("#city-list");
var currentDate = moment().format("M/DD/YYYY");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHum = $("#current-hum");
var currentUv = $("#current-uv");
var day1 = $("#day-0");
var day2 = $("#day-1");
var day3 = $("#day-2");
var day4 = $("#day-3");
var day5 = $("#day-4");
var searchBtn = $("#serch-btn");

// var key = "bfe4c6b0b80c5629d680df228c7a85c5";
var basicUrl = "https://api.openweathermap.org/data/2.5/"
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=" + key; 
var key = "abb27ab7b2c1aa8f64f406b7390718bd";
var cityName;
var latit;
var longit;






// create function to handle form submission
function selectCity(event) {
  event.preventDefault();
  // select form element by its `name` attribute and get its value
  var cityName = $('input[name="city-input"]').val();
  // if there's nothing in the form entered, don't print to the page
  if (!cityName) {
    alert("Introduce a city name");
    return;
  }
  getWeather(cityName)
  // print to the page
  cityListEl.append('<li class= "list-group-item">' + cityName + '</li>');

  // clear the form input element
  $('input[name="city-input"]').val('');
  //create a function `getWeather` that accepts `cityName` and call +

  //TODO store city on local storage
}


//funtion `getWeeather(lat, lon)`
function getWeather(){
    //fetch city data by lon and lat 
  var weatherByCity = "https://api.openweathermap.org/data/2.5/onecall?lat=${latit}&lon=${longit}&appid="+ key;
  fetch(weatherByCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var icon = data.current.weather[0].icon;
      currentCity.text(cityName + " " + currentDate + ".");
      currentCity.append('<img src="http://openweathermap.org/img/wnnnn/${icon}@2x.png" style="width:20px;height:30px;">');
      currentTemp.text(data.current.wind_speed);
      currentHum.text(data.current.humidity);
      var currentUvi = data.current.uvi;
      currentUv.text(currentUvi);
    //TODO:drill the data objerct to get lon
    //TODO:drill the data objerct to get lat
    //TODO call getWeatherfuntion and pass lat and lon
    }

      // 5day forecast(data) function
    for (i=0; i<5; i++) {
      var nextDay = moment().add(i+1, "d").format("M/DD/YYYY");
      var fiveDay = $("#day" + i);
      fiveDay.append("<div>${nextDay}</div>");
      var nextIcon = data["daily"][i].weather[0]["icon"];
      fiveDay.append('<img src="http://openweathermap.org/img/wnnnn/${nextIcon}@2x.png" style="width:20px;height:30px;">');
      fiveDay.append('<div>Temperature: ' + data['daily'][i].temp.day + ' F </div>');
      fiveDay.append('<div>Wind: ' + data['daily'][i].wind_speed + ' mph </div>');
      fiveDay.append('<div>Humidity: ' + data['daily'][i].humidity + ' % </div>');
    });
}




//TODO create a function `storeWeather(city)`

// Create a submit event listener on the form element
cityFormEl.on('submit', selectCity);