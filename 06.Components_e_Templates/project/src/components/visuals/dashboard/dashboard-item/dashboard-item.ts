import { Component, input } from '@angular/core';
import { dashBoardItemStyles } from './dashboard-item.styles';

type ImageSrc = { src: string; alt: string };

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.html',
  imports: [],
  host: { class: dashBoardItemStyles.dashboardItem }, //pra adicionar classes ao componente do selector, sem precisar que quem invoque ele precise colocar (util para h-100)
})
export class DashboardItemComponent {
  //@Input({ required: true }) title!: string; //old version (decorator, pode chamar sem () - mas precisa do ! pro typescript não reclamar)
  title = input.required<string>(); //new version (signal, precisa invocar com ())

  //@Input({ required: true }) imageSrc!: ImageSrc; //old version (decorator, pode chamar sem () - mas precisa do ! pro typescript não reclamar)
  imageSrc = input.required<ImageSrc>(); //new version (signal, precisa invocar com ())

  protected readonly styles = dashBoardItemStyles;
}
