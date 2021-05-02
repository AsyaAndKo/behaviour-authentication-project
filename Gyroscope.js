import React, { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

export default function GyroscopeFunc() {
  const xUnit = [1, 0, 0];
  const yUnit = [0, 1, 0];
  const zUnit = [0, 0, 1];

  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;

  const angleCounter = (xCoord, yCoord, zCoord) => {
    angleX = Math.acos(
      (xCoord * xUnit[0] + yCoord * xUnit[1] + zCoord * xUnit[2]) /
        (Math.sqrt(xCoord * xCoord + yCoord * yCoord + zCoord * zCoord) *
          Math.sqrt(
            xUnit[0] * xUnit[0] + xUnit[1] * xUnit[1] + xUnit[2] * xUnit[2]
          ))
    );
    angleY = Math.acos(
      (xCoord * yUnit[0] + yCoord * yUnit[1] + zCoord * yUnit[2]) /
        (Math.sqrt(xCoord * xCoord + yCoord * yCoord + zCoord * zCoord) *
          Math.sqrt(
            yUnit[0] * yUnit[0] + yUnit[1] * yUnit[1] + yUnit[2] * yUnit[2]
          ))
    );
    angleZ = Math.acos(
      (xCoord * zUnit[0] + yCoord * zUnit[1] + zCoord * zUnit[2]) /
        (Math.sqrt(xCoord * xCoord + yCoord * yCoord + zCoord * zCoord) *
          Math.sqrt(
            zUnit[0] * zUnit[0] + zUnit[1] * zUnit[1] + zUnit[2] * zUnit[2]
          ))
    );
  };
}
