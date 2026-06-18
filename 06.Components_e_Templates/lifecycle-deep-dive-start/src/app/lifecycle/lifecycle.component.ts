import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  /**
   * Executado no momento em que a instância do componente é criada.
   *
   * Uso comum:
   * - Injeção de dependências.
   * - Inicialização simples de propriedades.
   *
   * Cuidados:
   * - Inputs ainda não foram inicializados.
   * - Evite depender de valores recebidos via @Input().
   * - A View e o Template ainda não existem.
   */
  constructor() {
    console.log('CONSTRUCTOR');
  }

  /**
   * Executado uma única vez após o Angular definir os @Input() iniciais.
   *
   * Uso comum:
   * - Inicialização do componente.
   * - Carregamento inicial de dados.
   * - Configurações que dependem dos Inputs.
   *
   * Cuidados:
   * - Executa apenas uma vez durante o ciclo de vida.
   * - Alterações posteriores nos Inputs não passam por aqui.
   */
  ngOnInit() {
    console.log('ngOnInit');
  }

  /**
   * Executado sempre que algum @Input() recebe um novo valor.
   *
   * Uso comum:
   * - Reagir a alterações vindas do componente pai.
   * - Comparar valor anterior e atual.
   * - Atualizar estados derivados de Inputs.
   *
   * Cuidados:
   * - Também é executado antes do primeiro ngOnInit().
   * - Só detecta mudanças na referência do Input.
   *   Alterações internas de um objeto podem não disparar este hook.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
    console.log('text previous value: ', changes['text']?.previousValue);
    console.log('text current value: ', changes['text']?.currentValue);
  }

  /**
   * Executado durante cada ciclo de detecção de mudanças.
   *
   * Uso comum:
   * - Detectar alterações que o Angular não percebe automaticamente.
   * - Implementar lógica de comparação customizada.
   *
   * Cuidados:
   * - Pode ser chamado muitas vezes.
   * - Evite processamento pesado.
   * - Uso excessivo pode causar problemas de performance.
   */
  ngDoCheck() {
    console.log('ngDoCheck');
  }

  /**
   * Executado uma única vez após o conteúdo projetado via
   * <ng-content> ser inicializado.
   *
   * Uso comum:
   * - Acessar e configurar conteúdo projetado.
   * - Trabalhar com @ContentChild e @ContentChildren.
   *
   * Cuidados:
   * - Não está relacionado à View do componente.
   * - Só faz sentido quando existe projeção de conteúdo.
   */
  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  /**
   * Executado após cada verificação do conteúdo projetado.
   *
   * Uso comum:
   * - Monitorar alterações em conteúdo vindo de ng-content.
   *
   * Cuidados:
   * - Pode executar muitas vezes.
   * - Evite operações custosas ou alterações de estado.
   */
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  /**
   * Executado uma única vez após a View do componente ser criada.
   *
   * Uso comum:
   * - Acessar elementos do template.
   * - Trabalhar com @ViewChild e @ViewChildren.
   * - Inicializar bibliotecas que dependem do DOM.
   *
   * Cuidados:
   * - Alterar propriedades vinculadas ao template aqui pode gerar
   *   ExpressionChangedAfterItHasBeenCheckedError.
   */
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  /**
   * Executado após cada verificação da View do componente.
   *
   * Uso comum:
   * - Monitorar alterações na View.
   *
   * Cuidados:
   * - É chamado frequentemente.
   * - Evite alterar estados ou executar operações pesadas.
   * - Alterações indevidas podem causar ciclos extras de detecção.
   */
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  /**
   * Executado imediatamente antes da destruição do componente.
   *
   * Uso comum:
   * - Cancelar subscriptions.
   * - Remover event listeners.
   * - Limpar timers e intervalos.
   * - Liberar recursos externos.
   *
   * Cuidados:
   * - Esquecer limpezas aqui pode causar memory leaks.
   */
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
