import { TooltipModule, TooltipDirective } from './tooltip';
import { NgModule } from '@angular/core';
import { AlertModule, AlertService } from './alert';

@NgModule({
  declarations: [],
  imports: [AlertModule, TooltipModule],
  exports: [AlertModule, TooltipModule],
  providers: [AlertService, TooltipDirective],
})
export class AngularUIModule {}
