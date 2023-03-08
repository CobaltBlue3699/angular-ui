import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();

  showHeader = false;
  showSidebar = false;
  showFooter = false;

  public currentPath: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // 轉導後判斷header、footer、sidebar開啟或關閉
    this.router.events.pipe(takeUntil(this.destory$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild?.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild?.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild?.snapshot.data.showFooter !== false;
        console.log(event.urlAfterRedirects);
        this.currentPath = event.urlAfterRedirects.substring(
          event.urlAfterRedirects.indexOf('/') + 1,
        );
        if (this.currentPath.indexOf('/') > -1) {
          this.currentPath = this.currentPath.substring(
            this.currentPath.indexOf('/') + 1,
            this.currentPath.lastIndexOf('/') === this.currentPath.indexOf('/')
              ? this.currentPath.length
              : this.currentPath.lastIndexOf('/'),
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
  }
}
