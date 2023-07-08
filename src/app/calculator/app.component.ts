import { Component } from '@angular/core';
@Component({
  selector: 'calculator-app',
  templateUrl: './app.component.html',
})
export class CalculatorComponent {
  input: string = '';
  result: string = '';
  //  Method to clear all the input
  allclear() {
    this.input = '';
    this.result = '';
  }
  //  Method to clear the last operand
  clear() {
    if (this.input != '') {
      this.input = this.input.substring(0, this.input.length - 1);
    }
  }
  pressOperator(op: string) {
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '+' ||
      lastKey === '-'
    ) {
      return;
    }
    this.input = this.input + op;
    this.calcResult();
  }
  // Method to declare a number
  pressNum(num: string) {
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const prevKey = this.input[this.input.length - 1];
      if (
        prevKey === '/' ||
        prevKey === '*' ||
        prevKey === '+' ||
        prevKey === '-'
      ) {
        return;
      }
    }
    this.input = this.input + num;
    this.calcResult();
  }
  // Method to get result
  getResult() {
    this.calcResult();
    this.input = this.result;
    if (this.input == '0') {
      this.input = '';
    }
  }
  // Method to get last operand
  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    return this.input.substring(pos + 1);
  }
  calcResult() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    if (lastKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }
    lastKey = formula[formula.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '+' ||
      lastKey === '-'
    ) {
      formula = formula.substring(0, formula.length - 1);
    }
    this.result = eval(formula);
  }
}
