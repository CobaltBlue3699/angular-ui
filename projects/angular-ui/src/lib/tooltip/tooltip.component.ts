import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'au-tooltip',
  template: `<ng-container *ngTemplateOutlet="templateRef; context: context"></ng-container>`,
})
export class TooltipComponent {
  public templateRef!: TemplateRef<any>;
  public context: any;
}
