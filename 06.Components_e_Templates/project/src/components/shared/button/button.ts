import { Component } from '@angular/core';
import { buttonStyles } from './button.styles';

@Component({
  selector: 'button[appButton]', //aula 106 sobre isso
  templateUrl: './button.html',
  host: { class: 'group' },
  imports: [],
})
export class ButtonComponent {
  //teste = input.required<string>(); //assim ele vira um input obrigatório em button quando informar appButton
  //! mas nesse componente foi feito com dois ng-content

  protected styles = buttonStyles;
}
