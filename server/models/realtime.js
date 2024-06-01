let currentTemperature = null;

class Realtime {
  static setTemperature(temperature) {
    currentTemperature = temperature;
  }

  static getTemperature() {
    return currentTemperature;
  }
}

export default Realtime;
