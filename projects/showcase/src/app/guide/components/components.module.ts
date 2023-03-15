import { NgModule } from '@angular/core';
import { HintComponent } from './hint/hint.component';
import { WarnComponent } from './warn/warn.component';
import { AnchorDirective } from '../directives/anchor.directive';
import { SharedModule } from '../../shared/shared.module';
import { ScrollListenerDirective } from '../directives/scroll-listener.directive';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { PanelComponent } from './panel/panel.component';
import { HighlightModule } from 'ngx-highlightjs';
import { SimpleCodeComponent } from './simple-code/simple-code.component';
import { ExamplePanelComponent } from './example-panel/example-panel.component';
import { DocsComponent } from './docs/docs.component';
import { SubAnchorDirective } from '../directives/sub-anchor.directive';

const delcareAndExport = [
  HintComponent,
  WarnComponent,
  AnchorDirective,
  SubAnchorDirective,
  ScrollListenerDirective,
  TabsComponent,
  TabComponent,
  PanelComponent,
  SimpleCodeComponent,
  ExamplePanelComponent,
  DocsComponent,
];

@NgModule({
  declarations: [...delcareAndExport],
  imports: [SharedModule, HighlightModule],
  exports: [...delcareAndExport],
})
export class ComponentsModule {}
