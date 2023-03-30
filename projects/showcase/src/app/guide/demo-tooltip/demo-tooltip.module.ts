import { HighlightModule } from 'ngx-highlightjs';
import { NgModule } from '@angular/core';

import { DemoTooltipRoutingModule } from './demo-tooltip-routing.module';
import { DemoTooltipComponent } from './demo-tooltip.component';
import { ApiComponent } from './api/api.component';
import { OverviewComponent } from './overview/overview.component';
import { ExampleComponent } from './example/example.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [DemoTooltipComponent, ApiComponent, OverviewComponent, ExampleComponent],
  imports: [SharedModule, DemoTooltipRoutingModule, ComponentsModule, HighlightModule],
})
export class DemoTooltipModule {}
