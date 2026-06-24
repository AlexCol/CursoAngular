import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RectComponent } from './rect/rect.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RectComponent, FormsModule],
})
export class AppComponent {
  rectSize = {
    width: '200',
    height: '100',
  };
}
