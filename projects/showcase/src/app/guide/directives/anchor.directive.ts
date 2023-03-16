import { AnchorService } from './../services/anchor.service';
import { Directive, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Anchor } from '../services/anchor.service';
import { merge, Observable, takeUntil, Subject, timer, fromEvent, debounceTime } from 'rxjs';

@Directive({
  selector: '[appAnchor]',
})
export class AnchorDirective implements AfterViewInit, OnDestroy {
  @Input()
  name!: string;

  private anchor!: Anchor;
  destory$ = new Subject();

  constructor(private elementRef: ElementRef, private anchorService: AnchorService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const resize$ = fromEvent(window, 'resize');
      // images can affect the anchor's position.
      const imgs = document.querySelectorAll('img');
      const imgs$: Observable<any>[] = [];
      imgs.forEach((img) => {
        if (img.complete) {
          imgs$.push(timer(50));
        } else {
          imgs$.push(fromEvent(img, 'load'));
        }
      });
      merge([resize$, ...imgs$])
        .pipe(takeUntil(this.destory$), debounceTime(50))
        .subscribe(() => {
          // update anchor's location when img is loaded
          this.anchor.offsetTop = this.elementRef.nativeElement.offsetTop;
          this.anchorService.putAnchor(this.anchor);
        });
    });

    this.anchor = {
      name: this.name,
      offsetTop: this.elementRef.nativeElement.offsetTop,
    };
    this.anchorService.putAnchor(this.anchor);
  }

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
    this.anchorService.removeAnchor(this.anchor);
  }
}
