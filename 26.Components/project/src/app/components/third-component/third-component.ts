import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FirstWordPipe } from './pipes/first-word.pipe';
import { KebabCasePipe } from './pipes/kebab-case.pipe';
import { UpperCasePipe } from './pipes/upper-case.pipe';

@Component({
  selector: 'app-third-component',
  imports: [KebabCasePipe, UpperCasePipe, FirstWordPipe, CommonModule],
  templateUrl: './third-component.html',
  styleUrl: './third-component.css',
})
export class ThirdComponent {
  text = signal('Texto para Converter');
}
