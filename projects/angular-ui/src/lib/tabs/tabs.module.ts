import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TabsComponent,
    TabComponent
  ]
})
export class TabsModule { }
