import { TooltipModule, TooltipDirective } from './tooltip';
import { NgModule } from '@angular/core';
import { AlertModule, AlertService } from './alert';
import { TableModule } from './table';

@NgModule({
  declarations: [],
  imports: [AlertModule, TableModule, TooltipModule],
  exports: [AlertModule, TableModule, TooltipModule],
  providers: [AlertService, TooltipDirective],
})
export class AngularUIModule {}
