$(document).ready(function() {
  var thermostat = new Thermostat();
  var weatherApi = config.WEATHER_API_KEY;
  serverTemperature();
  serverCity();

  $('#temperature-up').click(function() {
    thermostat.increase();
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.decrease();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-on').click(function() {
    thermostat.powerSavingModeOn();
    $(this).removeClass('btn btn-dark')
    $(this).addClass('btn btn-success')
    $('#powersaving-off').removeClass('btn btn-danger')
    $('#powersaving-off').addClass('btn btn-dark')
    updateTemperature();
  })

  $('#powersaving-off').click(function() {
    thermostat.powerSavingModeOff();
    $(this).removeClass('btn btn-dark')
    $(this).addClass('btn btn-danger')
    $('#powersaving-on').removeClass('btn btn-success')
    $('#powersaving-on').addClass('btn btn-dark')
    updateTemperature();
  })

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
    $('#city-name').text(city);
    $.post( "http:localhost:9292/city", { city: city });
  })

  function updateTemperature() {
  $('#temperature').text(thermostat._temperature);
  $('#temperature').attr('class', thermostat.energyUsage());
  $.post( "http:localhost:9292/temperature", { temperature: thermostat._temperature });
}

  function displayWeather(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
  var token = '&appid=' + weatherApi;
  var units = '&units=metric';
  $.get(url + token + units, function(data) {
   $('#current-temperature').text(Math.round((data.main.temp)*10)/10);
  })
}

  function serverTemperature() {
    $.ajax({url:"http:localhost:9292/city",
            type: "HEAD",
            timeout:1000,
            statusCode: {
              200: function() {
                $.get("http:localhost:9292/temperature", function(data) {
               if(data !== ""){
                 thermostat._temperature = data;
               }
               updateTemperature();
             });
           },
           0: function() {
             updateTemperature();
           }
         }
       });
     }

  function serverCity() {
    $.ajax({url:"http:localhost:9292/city",
            type: "HEAD",
            timeout:1000,
            statusCode: {
              200: function() {
                $.get("http:localhost:9292/city", function(data) {
                 if(data !== ""){
                   var city = data
                   console.log(city)
                   displayWeather(city);
                   $('#city-name').text(city);
                 } else {
                   displayWeather('London');
                 }
               })
             },
              0: function() {
                displayWeather('London');
              }
            }
            });
          }

});
