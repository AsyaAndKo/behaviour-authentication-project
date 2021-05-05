import { DeviceMotion } from "expo-sensors";

export default class GyroscopeClass {
  constructor() {
    this.angle = 0;

    this.state = { data: { alpha: 0, beta: 0, gamma: 0 }, subscription: null };

    this.angle = 0;

    this.flag = false;

    this.alpha_stack = [];
    this.betta_stack = [];
    this.gamma_stack = [];
  }

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  _subscribe = (_subscriber, _interval) => {
    this.state = {
      subscription: DeviceMotion.addListener((gyroscopeData) => {
        this.state.data = gyroscopeData.rotation;
        _subscriber(gyroscopeData);
      }),
      data: { alpha: 0, beta: 0, gamma: 0 },
    };
    DeviceMotion.setUpdateInterval(_interval);
  };

  _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
    this.state.data = { alpha: 0, beta: 0, gamma: 0 };
    subscription && subscription.remove();
    this.state.subscription = null;
  };

  getMaximumAngle(angle_stack) {
    return Math.max(...angle_stack).toFixed(5);
  }

  getMinimumAngle(angle_stack) {
    return Math.min(...angle_stack).toFixed(5);
  }
}
