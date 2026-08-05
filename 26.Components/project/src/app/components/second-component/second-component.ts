import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-component',
  imports: [FormsModule],
  templateUrl: './second-component.html',
  styleUrl: './second-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondComponent {
  showMessage = false;
  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
  removeLastItem() {
    this.items.pop();
  }
  addItem() {
    const newItemNumber = this.items.length + 1;
    this.items.push({ id: newItemNumber, name: `Item ${newItemNumber}` });
  }
}
