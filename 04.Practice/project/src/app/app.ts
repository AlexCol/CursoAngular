import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header';
import { UserInputComponent } from '../components/user-input/user-input';
import { InvestmentParams } from '../models/dtos/investment-params';
import { InvestmentCalculatorService } from '../services/investment-calculator.service';
import { AppStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserInputComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private _service: InvestmentCalculatorService) {}
  protected styles = AppStyles;

  onCalculateInvestment(event: InvestmentParams) {
    console.log('Received investment parameters:', event);
    const calculatedInvestment = this._service.calculateInvestment(event);
    console.log('Calculated investment data:', calculatedInvestment);
  }
}
