'use strict';

function Thermostat(){
  this._MINIMUM_TEMPERATURE = 10;
  this._temperature = 20;
  this._powersave = true
}

Thermostat.prototype.temperature = function() {
  return this._temperature
};

Thermostat.prototype.increase = function() {
  if(this._powersave === true) {
    if(this._temperature === 25) {
      return;
    }
  }
  if(this._temperature === 32) {
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

Thermostat.prototype.togglePowersave = function() {
  this._powersave = !this._powersave
};
