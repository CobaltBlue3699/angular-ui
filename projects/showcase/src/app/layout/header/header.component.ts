import { filter, Subject } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, takeUntil } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { routes } from '../../guide/guide-routing.module';

interface AutoCompleteMenu {
  functionName: string;
  path: string;
  keyword: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private destory$ = new Subject();
  private _searchInput!: ElementRef;
  private defaultMenus: AutoCompleteMenu[] = [...routes]
    .flatMap((route) => {
      return route.children ? [route, ...route.children] : [route];
    })
    .filter((route) => route.path && route.data && route.data.isMenu)
    .map((route) => ({
      functionName: route.path as string,
      path: `./guide/${route.path}`,
      keyword: route.data && route.data.keywords ? route.data.keywords.join('') : '',
    }));

  public menus: AutoCompleteMenu[] = [];

  @ViewChild('searchInput', { static: false })
  set searchInput(v: ElementRef) {
    this._searchInput = v;
  }

  get searchInput() {
    return this._searchInput;
  }

  constructor(private translate: TranslateService) {}

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.destory$),
        debounceTime(200),
        map((e: any) => e.target.value as string),
        filter((value) => !!value && value.length >= 1),
        // distinctUntilChanged(),
      )
      .subscribe((input) => {
        this.menus = this.defaultMenus.filter(
          (tmp) =>
            tmp.functionName.indexOf(input) > -1 ||
            this.translate.instant(tmp.functionName).indexOf(input) > -1 ||
            tmp.keyword.indexOf(input) > -1,
        );
      });
  }

  ngOnInit(): void {}
}
