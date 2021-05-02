export default class TimeCounter {
  constructor() {
    this.timerValues = {
      LoginFocus: 0,
      LoginBlur: 0,
      LoginEnter: 0,
      PasswordFocus: 0,
      PasswordBlur: 0,
      PasswordEnter: 0,
      LoginPasswordEnter: 0,
    };
    this.data_pack = {
      LoginEnter: 0,
      PasswordEnter: 0,
      LoginPasswordEnter: 0,
      LoginSymbPerSec: 0,
      PasswordSymbPerSec: 0,
      LoginBackSpace: 0,
      PasswordBackSpace: 0,
      AngleXMin: 0,
      AngleXMax: 0,
      AngleYMin: 0,
      AngleYMax: 0,
      AngleZMin: 0,
      AngleZMax: 0,
    };
  }

  onTextFocus(textID) {
    let timeFocus = new Date().getTime();
    this.timerValues[textID + "Focus"] = timeFocus;
  }

  onTextBlur(textID) {
    let timeBlur = new Date().getTime();
    let timeFocus = this.timerValues[textID + "Focus"];
    let timeInInput = (timeBlur - timeFocus) / 1000;
    this.timerValues[textID + "Blur"] = timeBlur;
    this.timerValues[textID + "Enter"] = timeInInput;
    this.data_pack[textID + "Enter"] = this.timerValues[textID + "Enter"];
  }
}
