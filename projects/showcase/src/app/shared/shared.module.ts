import { TranslateModule } from '@ngx-translate/core';
import { TooltipDirective, TooltipModule } from 'angular-ui';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, TooltipModule],
  exports: [CommonModule, HttpClientModule, TranslateModule, TooltipModule],
  providers: [TooltipDirective],
})
export class SharedModule {}
