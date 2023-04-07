import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule, TabsModule } from 'angular-ui';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, TooltipModule, TabsModule],
  exports: [CommonModule, HttpClientModule, TranslateModule, TooltipModule, TabsModule],
  providers: [],
  declarations: [],
})
export class SharedModule {}
