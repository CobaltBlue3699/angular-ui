import { TooltipDirective, TooltipModule } from 'angular-ui';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule, TooltipModule],
  exports: [CommonModule, HttpClientModule, TooltipModule],
  providers: [TooltipDirective],
})
export class SharedModule {}
