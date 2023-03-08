import {
  Directive,
  Output,
  OnDestroy,
  ElementRef,
  HostListener,
  EventEmitter,
} from '@angular/core';

export interface ScrollEvent {
  scrollTop: number;
}

@Directive({
  selector: '[appScrollListener]',
})
export class ScrollListenerDirective implements OnDestroy {
  // @Output()
  // onScroll = new EventEmitter<ScrollEvent>();

  constructor(private elementRef: ElementRef) {
    // console.log(123, elementRef)
  }

  @HostListener('scroll', ['$event'])
  onScrollEvent($event: Event) {
    // const { scrollTop } = this.elementRef.nativeElement;
    // this.onScroll.next({ scrollTop });
  }

  ngOnDestroy(): void {
    // this.onScroll.complete();
  }
}
