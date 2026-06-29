import { Component } from '@angular/core';
import { SafeLinkDirective } from '../../custom-directives/safe-link.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.html',
  styleUrl: './learning-resources.css',
  imports: [SafeLinkDirective],
})
export class LearningResourcesComponent {}
