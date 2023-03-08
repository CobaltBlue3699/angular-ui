import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

export type Position = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnChanges {
  @Input() appTooltip!: string;
  @Input() appTooltipPosition: Position = 'top';

  private tooltip!: HTMLElement;

  position = {
    top: ['top-[-100%]', 'left-0'],
    left: ['left-[125%]', 'top-0'],
    right: ['left-[100%]', 'top-0'],
    bottom: ['bottom-[-100%]', 'left-0'],
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'relative');

    this.tooltip = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltip, 'absolute');
    this.renderer.addClass(this.tooltip, 'z-10');
    this.renderer.addClass(this.tooltip, 'inline-block');
    this.renderer.addClass(this.tooltip, 'bg-gray-900');
    this.renderer.addClass(this.tooltip, 'px-3');
    this.renderer.addClass(this.tooltip, 'py-2');
    this.renderer.addClass(this.tooltip, 'text-sm');
    this.renderer.addClass(this.tooltip, 'text-white');
    this.renderer.addClass(this.tooltip, 'font-medium');
    this.renderer.addClass(this.tooltip, 'transition-opacity');
    this.renderer.addClass(this.tooltip, 'duration-300');
    this.renderer.addClass(this.tooltip, 'rounded-lg');
    this.renderer.addClass(this.tooltip, 'shadow-sm');
    this.renderer.addClass(this.tooltip, 'whitespace-nowrap');
    this.renderer.addClass(this.tooltip, 'opacity-0');
    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.appTooltip));
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
      this.renderer.addClass(this.tooltip, 'opacity-1');
      this.renderer.removeClass(this.tooltip, 'opacity-0');
    });
    this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
      this.renderer.addClass(this.tooltip, 'opacity-0');
      this.renderer.removeClass(this.tooltip, 'opacity-1');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appTooltip']) {
      const tpmChanges = changes['appTooltip'];
      if (!tpmChanges.isFirstChange()) {
        this.renderer.removeChild(this.tooltip, this.tooltip.childNodes[0]);
        this.renderer.appendChild(this.tooltip, this.renderer.createText(tpmChanges.currentValue));
      }
    }
    if (changes['appTooltipPosition']) {
      const tpmChanges = changes['appTooltipPosition'];
      if (tpmChanges.previousValue) {
        const previous = tpmChanges.previousValue as Position;
        this.position[previous].forEach((clazz) => {
          this.renderer.removeClass(this.tooltip, clazz);
        });
      }
      const currentPosition = tpmChanges.currentValue as Position;
      setTimeout(() => {
        this.position[currentPosition].forEach((clazz) => {
          this.renderer.addClass(this.tooltip, clazz);
        });
      });
    }
  }
}
