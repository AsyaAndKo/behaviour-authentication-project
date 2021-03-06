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
      TypeJson: "",
      data: {
        LoginEnter: 0,
        PasswordEnter: 0,
        LoginPasswordEnter: 0,
        LoginSymbPerSec: 0,
        PasswordSymbPerSec: 0,
        LoginBackSpace: 0,
        PasswordBackSpace: 0,
        AlphaMin: 0,
        AlphaMax: 0,
        BettaMin: 0,
        BettaMax: 0,
        GammaMin: 0,
        GammaMax: 0,
      },
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
    this.data_pack.data[textID + "Enter"] = this.timerValues[textID + "Enter"];
  }
}
