import { TabsModule } from './tabs/tabs.module';
import { TooltipModule, TooltipDirective } from './tooltip';
import { NgModule } from '@angular/core';
import { AlertModule, AlertService } from './alert';

@NgModule({
  declarations: [],
  imports: [AlertModule, TooltipModule, TabsModule],
  exports: [AlertModule, TooltipModule, TabsModule],
  providers: [AlertService, TooltipDirective],
})
export class AngularUIModule {}
