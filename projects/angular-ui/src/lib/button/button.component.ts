import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent } from '../abstracts/ng-component';
import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { Nullable } from '../common';

@Component({
  selector: 'au-button',
  template: `
    <button
      type="button"
      class="btn"
      [disabled]="disabled || isLoading"
      (click)="whenClickButton($event)"
      [attr.GTM]="GTM"
    >
      <ng-container *ngIf="!isLoading || loadingFloat">
        {{ label | translate }}
      </ng-container>

      <span *ngIf="isLoading"> </span>
    </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true,
    },
  ],
})
export class ButtonComponent<T = any> extends AbstractNgModelComponent {
  @Input() isLoading: boolean = false;
  @Input() GTM: Nullable<string> = null;
  @Input() label: string = '';
  @Input() widthPercent = 100;
  @Input() bounceIn = false;

  @Output() whenClick = new EventEmitter<MouseEvent>();

  whenClickButton(event: MouseEvent) {
    this.whenClick.emit(event);
  }
}
