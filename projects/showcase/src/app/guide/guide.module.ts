import { DemoAlertModule } from './demo-alert/demo-alert.module';
import { NgModule } from '@angular/core';
import { GuideComponent } from './guide.component';
import { GuideRoutingModule } from './guide-routing.module';
import { IndexComponent } from './index/index.component';
import { HighlightModule } from 'ngx-highlightjs';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [GuideComponent, IndexComponent],
  imports: [SharedModule, ComponentsModule, GuideRoutingModule, HighlightModule, DemoAlertModule],
  exports: [],
})
export class GuideModule {}
