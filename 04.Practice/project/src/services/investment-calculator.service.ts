import { Injectable } from '@angular/core';
import { InvestmentParamsDto } from '../models/dtos/investment-params.dto';

@Injectable({
  providedIn: 'root',
})
export class InvestmentCalculatorService {
  calculateInvestment(params: InvestmentParamsDto) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } = params;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let year = 1; year <= duration; year++) {
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - initialInvestment - annualInvestment * year;
      annualData.push({
        year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment,
        totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    return annualData;
  }
}
