type Operator = "+"| "-"| "*"| "/";
export class Calculator {
  private current = 0;
  private memory = 0;
  private operator: Operator;

  protected processDigit(digit: string, currentValue: number) {
    if(digit >= "0" && digit <= "9") {
      return currentValue * 10 + (digit.charCodeAt(0)-"0".charCodeAt(0));
    }
  }

  protected processOperator(operator: string):Operator|undefined {
    if(["+", "-", "*", "/"].indexOf(operator) >= 0) {
      return operator as Operator;
    }
  }

  protected evaluatorOperator(operator: string, left: number, right:number): number {
    console.log(`${left} ${operator} ${right}`);
    switch(this.operator) {
      case "+": return left + right;
      case "-": return left - right;
      case "*": return left * right;
      case "/": return left / right;
    }
  }

  private eveluate() {
    if(this.operator) { 
      this.memory = this.evaluatorOperator(this.operator, this.memory, this.current);
    } else {
      this.memory = this.current;
    }
    this.current = 0;
  }

  public handleChar(char: string) {
    if(char === "=") {
      this.eveluate();
      return;
    }
    let value = this.processDigit(char, this.current);
    if(value !== undefined) {
      this.current = value;
      return;
    } else {
      let value = this.processOperator(char);
      if(value !== undefined) {
        this.eveluate();
        this.operator = value;
        return;
      }
    }
    throw new Error(`unsupported input: ${char}`);
  }

  public getResult() {
    return this.memory;
  }
}

export function test(c: Calculator, input: string) {
  for(let i=0; i<input.length; i++) {
    c.handleChar(input[i]);
  }
  console.log(`result of '${input}' is '${c.getResult()}'`)
}