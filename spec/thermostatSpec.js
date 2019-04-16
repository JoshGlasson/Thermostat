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

  describe('has temperature limits', function(){
    it('has a minimum of 10', function(){
      for (var i = 0; i < 14; i++) {
        thermostat.decrease();
      }
      expect(thermostat.temperature()).toEqual(10)
    });
    describe('powersave mode on', function(){
      it('has a maximum of 25', function(){
        for (var i = 0; i < 10; i++) {
          thermostat.increase();
        }
        expect(thermostat.temperature()).toEqual(25)
      });
    });
    describe('powersave mode off', function(){
      it('has a maximum of 32', function(){
        thermostat.togglePowersave();
        for (var i = 0; i < 15; i++) {
          thermostat.increase();
        }
        expect(thermostat.temperature()).toEqual(32)
      });
    });
  });
});
