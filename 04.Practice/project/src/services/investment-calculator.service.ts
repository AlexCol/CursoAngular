import { Injectable } from '@angular/core';
import { InvestmentParams } from '../models/dtos/investment-params';

@Injectable({
  providedIn: 'root',
})
export class InvestmentCalculatorService {
  calculateInvestment(params: InvestmentParams) {
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
