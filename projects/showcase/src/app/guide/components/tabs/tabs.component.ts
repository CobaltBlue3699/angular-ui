import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  ChangeDetectorRef,
  AfterContentInit,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  selectedTab!: TabComponent;

  ngAfterContentInit() {
    this.select(this.tabs.first);
  }

  onSelect(tab: TabComponent) {
    this.select(tab);
  }

  select(tab: TabComponent) {
    this.tabs.forEach((item) => {
      item.setActive(item === tab);
    });
    this.selectedTab = tab;
  }
}
