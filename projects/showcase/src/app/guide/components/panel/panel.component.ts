import { Component, Input } from '@angular/core';

// button will display on header
@Component({
  selector: 'app-panel',
  template: `
    <div class="rounded-xl bg-[#151515] text-[#fff] my-4 border-0 pb-5">
      <div class="h-12 py-3 px-3 relative flex flex-row justify-between">
        <span class="pl-1 pr-4 text-center">
          <strong>{{ name }}</strong>
        </span>
        <div class="flex justify-end">
          <ng-content select=".header-button"></ng-content>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class PanelComponent {
  @Input() name!: string;
}
