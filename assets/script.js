var key = "7aca6d5582fe8abbe1cd2a78e0c485b9";
let city = "Naples";

function getWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    console.log(response.coord.lat);
    var lon = response.coord.lon;
    var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function (uvresponse) {
      console.log(uvresponse);

      var uvIndex = uvresponse.value;
      var uvBox = $("<div>")
      
      if(uvIndex <= 2){
        uvBox.attr("class", "color-box1")
      }else if (uvIndex >= 3 && uvIndex <= 5){
        uvBox.attr("class", "color-box2")
      }else if (uvIndex >= 6 && uvIndex <= 7){
        uvBox.attr("class", "color-box3")
      }else if (uvIndex >= 8 && uvIndex <= 10){
        uvBox.attr("class", "color-box4")
      }else if (uvIndex >= 11){
        uvBox.attr("class", "color-box5")
      }

      uvBox.text("UV")
      var p4 = $("<p>").text("UV Index : " + uvIndex);
      p4.append(uvBox)
      weatherDiv.append(p4);
    });

    var dailyUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&units=imperial&appid=" + key;
      
    $.ajax({
      url: dailyUrl,
      method: "GET",
    }).then(function (dailyresponse) {
      console.log(dailyresponse)
      
      for (i=1; i < 6; i++){
        let date = dailyresponse.daily[i].dt
        let dailyDate = new Date (date * 1000).toLocaleDateString("en-US")
        $("#date-" + i).text(dailyDate)

        $("#weather-card-" + i).empty();

        let weatherImg = dailyresponse.daily[i].weather[0].icon
        let dailyIcon = "http://openweathermap.org/img/wn/" + weatherImg + "@2x.png"
        let img = $("<img>").attr("src", dailyIcon);
        
        let dailyHigh = dailyresponse.daily[i].temp.max
        let p1 = $("<p>")
        p1.text("High of: " + dailyHigh)

        let dailyLow = dailyresponse.daily[i].temp.min
        let p2 = $("<p>")
        p2.text("Low of: " + dailyLow)

        let dailyHumid= dailyresponse.daily[i].humidity
        let p3 = $("<p>")
        p3.text("Humidity: " + dailyHumid)  

        $("#weather-card-"+i).append(img, p1, p2, p3)
       
      }

      
      
    });

    console.log(response);

    $("#weather-score").empty();
    $("#city-name").empty();
    $("#country-name").empty();

   
    var cityName = response.name;

    var icon = response.weather[0].icon
    
    var weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    var image = $("<img>").attr("src", weatherIcon);
    image.attr("id", "imgicon")
    $("#city-name").append("City: " + cityName);
    $("#city-name").append(image)

    

    var countryName = response.sys.country;

    $("#country-name").append("Country: " + countryName);

    var weatherDiv = $("<div>");

    var temp = response.main.temp;

    var p1 = $("<p>").text("Temperature : " + temp);

    var humid = response.main.humidity;

    var p2 = $("<p>").text("Humidity: " + humid);

    var wind = response.wind.speed;

    var p3 = $("<p>").text("Windspeed : " + wind + " knots");

    weatherDiv.append(p1);
    weatherDiv.append(p2);
    weatherDiv.append(p3);

    $("#weather-score").append(weatherDiv);
    // cityList();
  });

}

// function cityList(city){

//     for(i=0; i < 5; i++){
//         let cityList = $("<li>")
//         cityList.text(city)
//         $("#city-list").append(cityList)
//     }
// }

$("#city-btn").on("click", function () {
  var city = $("#city-search").val().trim();
  getWeather(city);
});
