import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [TooltipDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule, HttpClientModule, TooltipDirective],
})
export class SharedModule {}
