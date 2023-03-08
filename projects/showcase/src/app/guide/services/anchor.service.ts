import { BehaviorSubject } from 'rxjs';
import { GuideModule } from './../guide.module';
import { Injectable } from '@angular/core';

export interface Anchor {
  name: string;
  offsetTop: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  private _anchors$ = new BehaviorSubject<Anchor[]>([]);

  constructor() {}

  public putAnchor(anchor: Anchor) {
    const tmp = this._anchors$.value.find((tmpAnchor) => tmpAnchor.name === anchor.name);
    if (tmp) {
      tmp.offsetTop = anchor.offsetTop;
      this._anchors$.next([...this._anchors$.value]);
    } else {
      const tmpArr = [anchor, ...this._anchors$.value];
      this._anchors$.next(tmpArr.sort((a, b) => a.offsetTop - b.offsetTop));
    }
  }

  public removeAnchor(anchor: Anchor) {
    const tmpArr = this._anchors$.value.filter((tmp) => tmp !== anchor);
    this._anchors$.next(tmpArr);
  }

  get anchors$() {
    return this._anchors$.asObservable();
  }
}
