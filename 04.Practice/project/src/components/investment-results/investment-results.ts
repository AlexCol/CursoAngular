import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { investmentResultsStyles } from './investment-results.styles';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-investment-results',
  templateUrl: './investment-results.html',
})
export class InvestmentResultsComponent {
  results = input.required<AnnualInvestmentDataDto[]>();

  protected readonly styles = investmentResultsStyles;
}
