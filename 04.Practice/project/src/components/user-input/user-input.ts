import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentParamsDto } from '../../models/dtos/investment-params.dto';
import { userInputStyles } from './user-input.styles';

@Component({
  imports: [FormsModule],
  selector: 'app-user-input',
  templateUrl: './user-input.html',
})
export class UserInputComponent {
  protected readonly styles = userInputStyles;

  //@Output() calculate = new EventEmitter<InvestmentParams>();
  calculate = output<InvestmentParamsDto>(); //usando signals

  /*
  enteredInitialInvestment = '0'; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredAnnualInvestment = '0'; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredExpectedReturn = '5'; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredYears = '10'; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  */
  enteredInitialInvestment = signal('0'); //!com signals, ao usar two-way binding, com [(ngModel)], não precisa chamar passando (), basta usar a prop name
  enteredAnnualInvestment = signal('0'); //!com signals, ao usar two-way binding, com [(ngModel)], não precisa chamar passando (), basta usar a prop name
  enteredExpectedReturn = signal('5'); //!com signals, ao usar two-way binding, com [(ngModel)], não precisa chamar passando (), basta usar a prop name
  enteredYears = signal('10'); //!com signals, ao usar two-way binding, com [(ngModel)], não precisa chamar passando (), basta usar a prop name

  onSubmit() {
    if (
      Number.isNaN(+this.enteredInitialInvestment()) ||
      Number.isNaN(+this.enteredAnnualInvestment()) ||
      Number.isNaN(+this.enteredExpectedReturn()) ||
      Number.isNaN(+this.enteredYears())
    ) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    const investmentParams: InvestmentParamsDto = {
      initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredYears(),
    };
    this.calculate.emit(investmentParams);

    this.resetForm();
  }

  private resetForm() {
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredYears.set('10');
  }
}
