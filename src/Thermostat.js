'use strict';

function Thermostat(){
  this._DEFAULT_TEMPERATURE = 20;
  this._MINIMUM_TEMPERATURE = 10;
  this._temperature = this._DEFAULT_TEMPERATURE;
  this._powersave = true
  this._PSM_ON_MAX = 25;
  this._PSM_OFF_MAX = 32;
  this._low_usage_band = 18;
}

Thermostat.prototype.temperature = function() {
  return this._temperature
};

Thermostat.prototype.increase = function() {
  if(this._powersave === true) {
    if(this._temperature >= this._PSM_ON_MAX) {
      return this._temperature = this._PSM_ON_MAX;
    }
    return this._temperature++
  }
  if(this._temperature === this._PSM_OFF_MAX) {
    return;
  }
  this._temperature++
};

Thermostat.prototype.decrease = function() {
  if(this._temperature === this._MINIMUM_TEMPERATURE ) {
  return;
    }
  this._temperature--
};

Thermostat.prototype.powerSavingModeOn = function() {
  this._powersave = true
  if(this._temperature >= this._PSM_ON_MAX) {
    this._temperature = this._PSM_ON_MAX;
  }
};

Thermostat.prototype.powerSavingModeOff = function() {
  this._powersave = false
};

Thermostat.prototype.reset = function() {
  this._temperature = this._DEFAULT_TEMPERATURE
};

Thermostat.prototype.energyUsage = function() {
  if(this._temperature < this._low_usage_band ) {
    return 'low-usage';
  }
  if(this._temperature >= this._low_usage_band && this._temperature <= this._PSM_ON_MAX) {
    return 'medium-usage';
  }
  return 'high-usage'
};
