import { Component } from '@angular/core';
import { InvestmentCalculatorService } from '../../services/investment-calculator.service';
import { investmentResultsStyles } from './investment-results.styles';

@Component({
  //imports: [CurrencyPipe],
  selector: 'app-investment-results',
  templateUrl: './investment-results.html',
  standalone: false,
})
export class InvestmentResultsComponent {
  //results = input.required<AnnualInvestmentDataDto[]>();
  constructor(private _service: InvestmentCalculatorService) {}
  //private _service = inject(InvestmentCalculatorService); //outra forma de injetar o service, usando a função inject, sem precisar do constructor, mas é mais comum usar o constructor para injetar os services

  protected readonly styles = investmentResultsStyles;

  get results() {
    return this._service.investmentResults;
  }
}
