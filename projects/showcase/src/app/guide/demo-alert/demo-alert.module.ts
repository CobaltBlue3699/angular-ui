import { TableModule } from './../../../../../angular-ui/src/lib/table/table.module';
import { DemoAlertComponent } from './demo-alert.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { DemoAlertRoutingModule } from './demo-alert-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { ExampleComponent } from './example/example.component';
import { ComponentsModule } from '../components/components.module';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [DemoAlertComponent, OverviewComponent, ApiComponent, ExampleComponent],
  imports: [SharedModule, DemoAlertRoutingModule, ComponentsModule, HighlightModule, TableModule],
})
export class DemoAlertModule {}
