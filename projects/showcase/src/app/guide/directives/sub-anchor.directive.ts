import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Optional } from '@angular/core';
import { fromEvent, merge, Observable, Subject, takeUntil, timer } from 'rxjs';
import { Anchor, AnchorService } from '../services/anchor.service';
import { AnchorDirective } from './anchor.directive';

@Directive({
  selector: '[appSubAnchor]'
})
export class SubAnchorDirective  implements AfterViewInit, OnDestroy {
  @Input()
  name!: string;

  private anchor!: Anchor;
  destory$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    private anchorService: AnchorService,
    // The @Optional() decorator tells Angular to inject the AnchorDirective instance if it exists in the component hierarchy,
    // and to inject null if it doesn't.
    @Optional() private parentAnchor: AnchorDirective) {}

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
        .pipe(takeUntil(this.destory$))
        .subscribe(() => {
          // update anchor's location when img is loaded
          this.anchor.offsetTop = this.elementRef.nativeElement.offsetTop;
          this.putAnchor();
        });
    });

    this.anchor = {
      name: this.name,
      offsetTop: this.elementRef.nativeElement.offsetTop,
      isChildren: true,
    };

    this.putAnchor();
  }

  putAnchor() {
    if (this.parentAnchor && this.anchorService.getAnchorByName(this.parentAnchor.name)) {
      const parent = this.anchorService.getAnchorByName(this.parentAnchor.name) as Anchor;
      parent.children = parent.children || [];
      if (parent.children.indexOf(this.anchor) < 0) {
        parent.children.push(this.anchor)
      }
      this.anchorService.putAnchor(parent);
    }
  }

  removeAnchor() {
    if (this.parentAnchor && this.anchorService.getAnchorByName(this.parentAnchor.name)) {
      const parent = this.anchorService.getAnchorByName(this.parentAnchor.name) as Anchor;
      parent.children = parent.children || [];
      parent.children = parent.children.filter(anchor => anchor != this.anchor)
      this.anchorService.putAnchor(parent);
    }
  }

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
    this.removeAnchor();
  }
}