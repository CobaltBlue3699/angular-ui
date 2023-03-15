import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Anchor {
  name: string;
  offsetTop: number;
  isChildren?: boolean;
  children?: Anchor[];
}

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  private _anchors$ = new BehaviorSubject<Anchor[]>([]);

  constructor() {}

  public putAnchor(anchor: Anchor) {
    const tmp = this._anchors$.value.find((tmpAnchor) => tmpAnchor.name === anchor.name);
    if (anchor.children) {
      anchor.children = anchor.children.sort((a, b) => a.offsetTop - b.offsetTop);
    }
    if (tmp) {
      tmp.offsetTop = anchor.offsetTop;
      const tmpArr = [...this._anchors$.value];
      this._anchors$.next(tmpArr.sort((a, b) => a.offsetTop - b.offsetTop));
    } else {
      const tmpArr = [anchor, ...this._anchors$.value];
      this._anchors$.next(tmpArr.sort((a, b) => a.offsetTop - b.offsetTop));
    }
  }

  public removeAnchor(anchor: Anchor) {
    const tmpArr = this._anchors$.value.filter((tmp) => tmp !== anchor);
    this._anchors$.next(tmpArr);
  }

  getAnchorByName(name: string) {
    return this._anchors$.value.find(anchor => anchor.name === name);
  }

  get anchors$() {
    return this._anchors$.asObservable();
  }
}
