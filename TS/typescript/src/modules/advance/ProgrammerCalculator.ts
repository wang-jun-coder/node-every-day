import { Calculator } from './Calculator';

class ProgrammerCalculator extends Calculator {
  static digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  constructor(public base:number) {
    super();
    const maxBase = ProgrammerCalculator.digits.length;
    if(base < 0 || base > maxBase) throw new Error(`base has to be within 0 to ${maxBase} inclusive`);
  };

  protected processDigit(digit:string, currentValue: number) {
    if(ProgrammerCalculator.digits.indexOf(digit) >=0) {
      return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
    }
  }
}

export { ProgrammerCalculator as Calculator };
export { test } from './Calculator';