var key = "7aca6d5582fe8abbe1cd2a78e0c485b9";
let city = "Estero";
let savedCity = [];

function getWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    key;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    console.log(response.coord.lat);
    var lon = response.coord.lon;
    var uvUrl =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      key +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function (uvresponse) {
      console.log(uvresponse);

      var uvIndex = uvresponse.value;
      var uvBox = $("<div>");

      if (uvIndex <= 2) {
        uvBox.attr("class", "color-box1");
      } else if (uvIndex >= 3 && uvIndex < 6) {
        uvBox.attr("class", "color-box2");
      } else if (uvIndex >= 6 && uvIndex < 8) {
        uvBox.attr("class", "color-box3");
      } else if (uvIndex >= 8 && uvIndex < 11) {
        uvBox.attr("class", "color-box4");
      } else if (uvIndex >= 11) {
        uvBox.attr("class", "color-box5");
      }

      uvBox.text("UV");
      var p4 = $("<p>").text("UV Index : " + uvIndex);
      p4.attr("class", "weather-body");
      p4.append(uvBox);
      weatherDiv.append(p4);
    });

    var dailyUrl =
      "https://api.openweathermap.org/data/2.5/onecall?" +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=current,minutely,hourly&units=imperial&appid=" +
      key;

    $.ajax({
      url: dailyUrl,
      method: "GET",
    }).then(function (dailyresponse) {
      console.log(dailyresponse);

      for (i = 1; i < 6; i++) {
        let date = dailyresponse.daily[i].dt;
        let dailyDate = new Date(date * 1000).toLocaleDateString("en-US");
        $("#date-" + i).text(dailyDate);

        $("#weather-card-" + i).empty();

        let weatherImg = dailyresponse.daily[i].weather[0].icon;
        let dailyIcon =
          "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
        let img = $("<img>").attr("src", dailyIcon);

        let dailyHigh = dailyresponse.daily[i].temp.max;
        let p1 = $("<p>");
        p1.text("High of: " + dailyHigh);
        let dailyLow = dailyresponse.daily[i].temp.min;
        let p2 = $("<p>");
        p2.text("Low of: " + dailyLow);
        let dailyHumid = dailyresponse.daily[i].humidity;
        let p3 = $("<p>");
        p3.text("Humidity: " + dailyHumid);

        $("#weather-card-" + i).append(img, p1, p2, p3);
        
      }
    });

    $("#weather-score").empty();
    $("#city-name").empty();
    $("#country-name").empty();

    var cityName = response.name;
    var icon = response.weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    var image = $("<img>").attr("src", weatherIcon);
    image.attr("id", "imgicon");
    $("#city-name").append("City: " + cityName);
    $("#city-name").append(image);
    var countryName = response.sys.country;
    $("#country-name").append("Country: " + countryName);

    var weatherDiv = $("<div>");
    var temp = response.main.temp;
    var p1 = $("<p>").text("Temperature : " + temp);
    p1.attr("class", "weather-body");
    var humid = response.main.humidity;
    var p2 = $("<p>").text("Humidity: " + humid);
    p2.attr("class", "weather-body");
    var wind = response.wind.speed;
    var p3 = $("<p>").text("Windspeed : " + wind + " knots");
    p3.attr("class", "weather-body");

    weatherDiv.append(p1, p2, p3);
    $("#weather-score").append(weatherDiv);

  });
}

function cityList(city) {
  if (savedCity.length == 6) {
    console.log(savedCity);
    savedCity.splice(0, 1);
  }
  city = city.charAt(0).toUpperCase() + city.slice(1);
  $("#city-list").empty();
  let cityArray = {
    city: city,
  };

  savedCity.push(cityArray);

  console.log(savedCity);

  for (i = 0; i < savedCity.length; i++) {
    let cityList = $("<button>");
    cityList.attr("class", "list-group-item");
    cityList.attr("id", "clist-", i);
    cityList.attr("type", "click");
    cityList.attr("data-li", i);
    cityList.text(savedCity[i].city);

    $("#city-list").prepend(cityList);
  }
  localStorage.setItem("savedCity", JSON.stringify(savedCity));
}

function getCity() {
  if (localStorage.getItem("savedCity") !== null) {
    let loadCity = JSON.parse(localStorage.getItem("savedCity"));
    for (i = 0; i < loadCity.length; i++) {
      let cityList = $("<button>");
      cityList.attr("class", "list-group-item button");
      cityList.attr("id", "clist-" + i);
      cityList.attr("type", "click");
      cityList.attr("data-li", i);
      cityList.text(loadCity[i].city);

      $("#city-list").prepend(cityList);

      let cityArray = {
        city: loadCity[i].city,
      };
      savedCity.push(cityArray);
      console.log(savedCity);
    }
    let theCity = savedCity[savedCity.length - 1];
    let loadedCity = theCity.city;
    getWeather(loadedCity);
  }
}

getCity();

$("#city-btn").on("click", function () {
  if (city == " ") {
    return;
  } else {
    var city = $("#city-search").val().trim();
  }
  getWeather(city);
  cityList(city);
});

$(".list-group-item").on("click", function () {
  console.log("line 208 ----", this);
  let citydata = $(this).attr("data-li");
  let cityClick = $(this).text();
  console.log(citydata);
  console.log(cityClick);
  getWeather(cityClick);
});