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
    it('can be reset', function(){
      thermostat.increase();
      thermostat.reset();
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
      it('is on by default', function(){
        expect(thermostat._powersave).toEqual(true)
      });
    });
    describe('powersave mode off', function(){
      it('has a maximum of 32', function(){
        thermostat.powerSavingModeOff();
        for (var i = 0; i < 15; i++) {
          thermostat.increase();
        }
        expect(thermostat.temperature()).toEqual(32)
      });
    });
  });
  describe('can check energy usage', function(){
    it('returns low for less than 18', function(){
      for (var i = 0; i < 3; i++) {
        thermostat.decrease();
      }
      expect(thermostat.energyUsage()).toEqual('low-usage')
    });
    it('returns medium for less than 18 to 25 ', function(){
      expect(thermostat.energyUsage()).toEqual('medium-usage')
    });
    it('returns low for less than 18', function(){
      thermostat.powerSavingModeOff();
      for (var i = 0; i < 10; i++) {
        thermostat.increase();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage')
    });
  });
});
