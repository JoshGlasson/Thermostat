$(document).ready(function() {
  var thermostat = new Thermostat();
  var weatherApi = config.WEATHER_API_KEY;
  updateTemperature();

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
    $('#power-saving-status').text('on')
    updateTemperature();
  })

  $('#powersaving-off').click(function() {
    thermostat.powerSavingModeOff();
    $('#power-saving-status').text('off')
    updateTemperature();
  })

  displayWeather('London');

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
  })

  function updateTemperature() {
  $('#temperature').text(thermostat._temperature);
  $('#temperature').attr('class', thermostat.energyUsage());
}

  function displayWeather(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
  var token = '&appid=' + weatherApi;
  var units = '&units=metric';
  $.get(url + token + units, function(data) {
   $('#current-temperature').text(data.main.temp);
  })
}

});
