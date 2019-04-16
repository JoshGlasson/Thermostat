'use strict';

describe('Thermostat', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('thermostat has default temp', function(){
    it('starts at 20', function(){
      expect(thermostat.temperature()).toBe(20);
    });
  });

  describe('temperature can be changed', function(){
    it('can be increased', function(){
      thermostat.increase();
      expect(thermostat.temperature()).toBe(21);
    });
    it('can be decreased', function(){
      thermostat.decrease();
      expect(thermostat.temperature()).toBe(19);
    });
  });
});
