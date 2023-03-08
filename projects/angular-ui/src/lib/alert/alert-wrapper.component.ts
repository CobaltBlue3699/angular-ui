import { AlertRef, AlertType } from './alert.service';
import { Component, TemplateRef, Input } from '@angular/core';
import { Nullable } from '../common';

@Component({
  selector: 'ac-alert-wrapper',
  templateUrl: `./alert-wrapper.component.html`,
})
export class AlertWrapperComponent {
  @Input() templates: {
    successTemplate: Nullable<TemplateRef<any>>;
    infoTemplate: Nullable<TemplateRef<any>>;
    warningTemplate: Nullable<TemplateRef<any>>;
    errorTemplate: Nullable<TemplateRef<any>>;
  } = {
    successTemplate: null,
    infoTemplate: null,
    warningTemplate: null,
    errorTemplate: null,
  };
  @Input() alertRef!: AlertRef;

  get AlertType() {
    return AlertType;
  }
}
