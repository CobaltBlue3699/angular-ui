import { Anchor, AnchorService } from './services/anchor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, skip, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();
  anchors!: Anchor[];

  constructor(private anchorService: AnchorService) {}

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
  }

  ngOnInit(): void {
    this.anchorService.anchors$
      .pipe(takeUntil(this.destory$), skip(1), debounceTime(200))
      .subscribe((anchors) => {
        this.anchors = anchors.flatMap((anchor) => {
          if (anchor.children) {
            return [anchor, ...anchor.children]
          }
          return [anchor];
        });
      });
  }
}
