import { TabComponent } from './tab/tab.component';
import { AfterContentInit, Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { Nullable } from '../common';

@Component({
  selector: 'au-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;
  
  @ContentChild('tabsWrapper', { static: false })
  tabsWrapper: Nullable<TemplateRef<any>> = null;

  selectedTab: Nullable<TabComponent> = null;

  ngAfterContentInit() {
    console.log(this.tabs)
    this.select(this.tabs.first);
  }

  select(tab: TabComponent) {
    if (this.selectedTab && this.selectedTab !== tab) {
      this.selectedTab.setActive(false)
    }
    tab.setActive(true);
    this.selectedTab = tab;
  }
}
