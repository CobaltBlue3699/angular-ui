import { InjectionToken } from '@angular/core';
import { TooltipGlobalOptions } from '.';

/** Injection token that can be used to specify default tooltip options. */
export const TOOLTIP_DEFAULT_OPTIONS = new InjectionToken<TooltipGlobalOptions>(
  'tooltip-default-options',
);
