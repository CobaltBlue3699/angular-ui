import { AbstractNgModelComponent } from './ng-component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ template: '' })
export class AbstractInputComponent extends AbstractNgModelComponent<string> {
  @Input()
  readonly: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  placeholder: string = '';

  @Input()
  type: string = 'text';

  @Output()
  whenBlur = new EventEmitter<void>();

  @Output()
  whenFocus = new EventEmitter<void>();

  get inputReadonly(): boolean {
    return this.readonly || typeof this.readonly !== 'boolean';
  }

  get inputRequired(): boolean {
    return this.required || typeof this.required !== 'boolean';
  }
}
