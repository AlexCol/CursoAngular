import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-component',
  imports: [FormsModule, NgClass],
  templateUrl: './second-component.html',
  styleUrl: './second-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondComponent {
  showMessage = false;
  toggleMessage() {
    this.showMessage = !this.showMessage;
  }
  /*********************************************************************/
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
  /*********************************************************************/
  private colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  _currentColorIndex = 0;
  get color() {
    return this.colors[this._currentColorIndex];
  }
  changeColor() {
    this._currentColorIndex = (this._currentColorIndex + 1) % this.colors.length;
  }
  /*********************************************************************/
  selectedTech = signal('Angular');
  selectTech(tech: string) {
    this.selectedTech.set(tech);
  }
}
