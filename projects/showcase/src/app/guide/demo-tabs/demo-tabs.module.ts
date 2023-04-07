import { ExampleComponent } from './example/example.component';
import { NgModule } from '@angular/core';
import { DemoTabsComponent } from './demo-tabs.component';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { SharedModule } from '../../shared/shared.module';
import { DemoTabsRoutingModule } from './demo-tabs-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HighlightModule } from 'ngx-highlightjs';



@NgModule({
  declarations: [DemoTabsComponent, OverviewComponent, ApiComponent, ExampleComponent],
  imports: [SharedModule, DemoTabsRoutingModule, ComponentsModule, HighlightModule],
})
export class DemoTabsModule { }
