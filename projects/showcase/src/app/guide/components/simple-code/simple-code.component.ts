import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-code',
  template: `
    <app-panel [name]="name">
      <button
        tabs-button
        [appTooltip]="copyToolTipText"
        appTooltipPosition="right"
        class="header-button px-4 cursor-pointer text-xs pt-1"
        (click)="copyToClipboard(code)"
      >
        <i class="fa-regular fa-copy"></i>
      </button>
      <code [highlight]="code"></code>
    </app-panel>
  `,
  styles: [``],
})
export class SimpleCodeComponent {
  @Input() name!: string;
  @Input() code!: string;
  copyToolTipText = 'Copy';

  copyToClipboard(text: string): void {
    this.copyToolTipText = 'Coppied !!';
    setTimeout(() => {
      this.copyToolTipText = 'Copy';
    }, 2000);
    navigator.clipboard.writeText(text);
  }
}
