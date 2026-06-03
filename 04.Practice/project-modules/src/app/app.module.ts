import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../components/header/header';
import { InvestmentResultsComponent } from '../components/investment-results/investment-results';
import { UserInputModule } from '../components/user-input/user-input.module';
import { App } from './app';

@NgModule({
  declarations: [App, HeaderComponent, InvestmentResultsComponent],
  imports: [BrowserModule, UserInputModule], //BrowserModule usado para os pipes
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
