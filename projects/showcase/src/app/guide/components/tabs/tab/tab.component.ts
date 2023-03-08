import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  private _active: boolean = false;
  @Input() name!: string;
  @Output() active = new EventEmitter();
  constructor() {}

  setActive(active: boolean) {
    this._active = active;
    if (active) {
      this.active.next(void 0);
    }
  }

  get isActive() {
    return this._active;
  }
}
