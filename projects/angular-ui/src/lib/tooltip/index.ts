export * from './tooltip.module';
export * from './tooltip.directive';
export * from './tooltip.constants';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export class TooltipGlobalOptions {
  backgroundColor?: string = `#333`;
  textColor?: string = `#fff`;
  position?: TooltipPosition = 'top';
}
