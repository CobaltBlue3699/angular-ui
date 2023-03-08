import { InjectionToken } from '@angular/core';
import { AlertGlobalOptions } from './alert.service';

/** Injection token that can be used to specify default alert options. */
export const ALERT_DEFAULT_OPTIONS = new InjectionToken<AlertGlobalOptions>(
  'alert-default-options',
);
