import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header';
import { InvestmentResultsComponent } from '../components/investment-results/investment-results';
import { UserInputComponent } from '../components/user-input/user-input';
import { InvestmentParamsDto } from '../models/dtos/investment-params.dto';
import { InvestmentCalculatorService } from '../services/investment-calculator.service';
import { AppStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private _service: InvestmentCalculatorService) {}
  protected styles = AppStyles;
  protected investmentResults: AnnualInvestmentDataDto[] = [];

  onCalculateInvestment(event: InvestmentParamsDto) {
    console.log('Received investment parameters:', event);
    const calculatedInvestment = this._service.calculateInvestment(event);
    this.investmentResults = calculatedInvestment;
  }
}
