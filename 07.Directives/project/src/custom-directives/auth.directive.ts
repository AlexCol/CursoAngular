import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '../components/auth/auth.model';
import { AuthService } from '../components/auth/auth.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  //private authService = inject(AuthService); //prefiro injetar no contrutor
  //private templateRef = inject(TemplateRef); //prefiro injetar no contrutor
  //private viewContainerRef = inject(ViewContainerRef); //prefiro injetar no contrutor
  public userType = input.required<Permission>({ alias: 'appAuth' });

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<unknown>, //referencia ao template que será renderizado (dá acesso ao conteudo do template)
    private viewContainerRef: ViewContainerRef, //referencia no DOM, onde o template será renderizado
  ) {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef); //renderiza o template no DOM
      } else {
        this.viewContainerRef.clear(); //remove o template do DOM
      }
    });
  }
}
