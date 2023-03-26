import { TooltipComponent } from './tooltip.component';
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
  TemplateRef,
  AfterViewChecked,
  AfterContentChecked,
  Injector,
  ComponentRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipGlobalOptions, TooltipPosition } from '.';
import { TOOLTIP_DEFAULT_OPTIONS } from './tooltip.constants';
import { defaults } from 'lodash';
import { Nullable } from '../common';

@Directive({
  selector: '[auTooltip]',
})
export class TooltipDirective
  implements OnInit, OnChanges, OnDestroy, AfterViewChecked, AfterContentChecked
{
  tooltip!: HTMLElement;
  @Input() auTooltip: string | TemplateRef<any> = '';
  @Input() activeOnLoaded: boolean = false;
  // @Input() context: any;

  private componentInstance: Nullable<ComponentRef<TooltipComponent>> = null;
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
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
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
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.renderer.addClass(this.tooltip, 'tooltip');

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
      if (changes['auTooltip']) {
        const tpmChanges = changes['auTooltip'];
        if (!tpmChanges.isFirstChange()) {
          this.renderer.removeChild(this.tooltip, this.tooltip.childNodes[0]);
          this.render();
        }
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

    this.render();
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
    //  clear view
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
  }

  setPosition() {
    if (this.tooltip) {
      this.tooltip.classList.remove('top', 'bottom', 'left', 'right');
      this.renderer.addClass(this.tooltip, this.options.position as string);

      const host = this.el.nativeElement;
      let top = 0;
      let left = 0;
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

  render() {
    if (this.auTooltip instanceof TemplateRef) {
      this.componentInstance = this.viewContainerRef.createComponent(TooltipComponent, {
        injector: this.injector,
      });
      // this.componentInstance.instance.context = this.context;
      this.componentInstance.instance.templateRef = this.auTooltip;
      this.renderer.appendChild(this.tooltip, this.componentInstance.location.nativeElement);
    } else {
      this.renderer.appendChild(this.tooltip, this.renderer.createText(this.auTooltip));
    }
    this.tooltip.style.setProperty(`--bg-color`, this.options.backgroundColor as string);
    this.tooltip.style.setProperty(`--color`, this.options.textColor as string);
  }

  // compute tooltip's position again, when the view is changing.
  ngAfterContentChecked(): void {
    this.setPosition();
  }

  ngAfterViewChecked(): void {
    this.setPosition();
  }
}
