import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  OnInit,
  OnDestroy,
  Inject,
  Optional,
} from '@angular/core';
import { TooltipGlobalOptions, TooltipPosition } from '.';
import { TOOLTIP_DEFAULT_OPTIONS } from './tooltip.constants';
import { defaults } from 'lodash';

@Directive({
  selector: '[auTooltip]',
})
export class TooltipDirective implements OnInit, OnChanges, OnDestroy {
  tooltip!: HTMLElement;
  @Input(`auTooltip`) text: string = '';
  @Input() activeOnLoaded:boolean = false;

  private options: TooltipGlobalOptions = {};
  // options
  @Input(`bg-color`)
  set bgColor(bgColor: string) {
    this.options.backgroundColor = bgColor;
  }
  @Input()
  set color(color: string) {
    this.options.textColor = color;
  }
  @Input()
  set position(position: TooltipPosition) {
    this.options.position = position;
  }

  private prefixPadding: number = 8;

  private destory$ = new Subject();
  private show$ = new Subject();
  private hide$ = new Subject();
  private changes$ = new BehaviorSubject<SimpleChanges>({});

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(TOOLTIP_DEFAULT_OPTIONS)
    @Optional()
    moduleOptions: TooltipGlobalOptions,
  ) {
    this.options = defaults(this.options, moduleOptions, new TooltipGlobalOptions());
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'angular-ui');
    this.renderer.addClass(this.el.nativeElement, 'relative');
    this.tooltip = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltip, 'tooltip');

    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.text));
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.setPosition();
    this.tooltip.style.setProperty(`--bg-color`, this.options.backgroundColor as string);
    this.tooltip.style.setProperty(`--color`, this.options.textColor as string);

    if (this.activeOnLoaded) {
      this.renderer.addClass(this.tooltip, 'tooltip-active');
    }

    this.show$.pipe(takeUntil(this.destory$), debounceTime(10)).subscribe(() => {
      this.renderer.addClass(this.tooltip, 'tooltip-active');
    });

    this.hide$.pipe(takeUntil(this.destory$), debounceTime(10)).subscribe(() => {
      this.renderer.removeClass(this.tooltip, 'tooltip-active');
    });

    this.changes$.pipe(takeUntil(this.destory$)).subscribe((changes: SimpleChanges) => {
      if (changes['text']) {
        const tpmChanges = changes['text'];
        if (!tpmChanges.isFirstChange()) {
          this.renderer.removeChild(this.tooltip, this.tooltip.childNodes[0]);
          this.renderer.appendChild(
            this.tooltip,
            this.renderer.createText(tpmChanges.currentValue),
          );
        }
        this.setPosition();
      }
      if (changes['position']) {
        this.setPosition();
      }
      if (changes['bgColor']) {
        this.tooltip.style.setProperty(`--bg-color`, this.options.backgroundColor as string);
      }
      if (changes['color']) {
        this.tooltip.style.setProperty(`--color`, this.options.textColor as string);
      }
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.show$.next(void 0);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide$.next(void 0);
  }

  @HostListener('touchstart') onTouchStart() {
    this.show$.next(void 0);
  }

  @HostListener('touchend') onTouchEnd() {
    this.hide$.next(void 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changes$.next(changes);
  }

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
    this.show$.complete();
    this.hide$.complete();
  }

  setPosition() {
    if (this.tooltip) {
      this.tooltip.classList.remove('top', 'bottom', 'left', 'right');
      this.renderer.addClass(this.tooltip, this.options.position as string);

      const host = this.el.nativeElement;
      let top = 0,
        left = 0;
      switch (this.options.position) {
        case 'top':
          top = -this.tooltip.offsetHeight - this.prefixPadding;
          left = (host.offsetWidth - this.tooltip.offsetWidth) / 2;
          break;
        case 'bottom':
          top = host.offsetHeight + this.prefixPadding;
          left = (host.offsetWidth - this.tooltip.offsetWidth) / 2;
          break;
        case 'left':
          top = (host.offsetHeight - this.tooltip.offsetHeight) / 2;
          left = -this.tooltip.offsetWidth - this.prefixPadding;
          break;
        case 'right':
          top = (host.offsetHeight - this.tooltip.offsetHeight) / 2;
          left = host.offsetWidth + this.prefixPadding;
          break;
      }

      this.renderer.setStyle(this.tooltip, 'top', top + 'px');
      this.renderer.setStyle(this.tooltip, 'left', left + 'px');
    }
  }
}
