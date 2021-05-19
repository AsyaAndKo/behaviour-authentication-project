export default class KeyInputActivity {
  constructor() {
    this.textChangeStart = 0;
    this.textChangeEnd = 0;
    this.timeForEightSymbols = 0;

    this.countKeyPress = 0;
    this.countBackSpace = 0;
    this.saveBackSpace = 0;
  }

  onTextChange(newText, currentText, textInputID) {
    this.countKeyPress += 1;
    if (currentText.length == 0) {
      this.textChangeStart = new Date().getTime();
      currentText = newText;
    }
    if (currentText.length > newText.length) {
      this.countBackSpace += 1;
      console.log(this.countBackSpace);
    }
    if (currentText.length == 7) {
      this.textChangeEnd = new Date().getTime();
      currentText = newText;
      this.timeForEightSymbols =
        (this.textChangeEnd - this.textChangeStart) / 1000;
      this.symbolsPerSecond = (
        this.countKeyPress / this.timeForEightSymbols
      ).toFixed(14);
      console.log(this.symbolsPerSecond);
      this.countKeyPress = 0;
      this.saveBackSpace = this.countBackSpace;
      this.countBackSpace = 0;
    } else {
      currentText = newText;
    }
  }

  printSymbolsPerSecond() {
    return parseFloat(this.symbolsPerSecond);
  }
}
