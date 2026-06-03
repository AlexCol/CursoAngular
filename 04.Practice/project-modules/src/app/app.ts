import { Component } from '@angular/core';
import { AppStyles } from './app.styles';

@Component({
  selector: 'app-root',
  //imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  standalone: false,
  templateUrl: './app.html',
})
export class App {
  //constructor(private _service: InvestmentCalculatorService) {}
  protected styles = AppStyles;
  //protected investmentResults = signal<AnnualInvestmentDataDto[]>([]);

  /*
  onCalculateInvestment(event: InvestmentParamsDto) {
    console.log('Received investment parameters:', event);
    const calculatedInvestment = this._service.calculateInvestment(event);
    this.investmentResults.set(calculatedInvestment);
  }
  */
}
