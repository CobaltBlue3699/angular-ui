import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertGlobalOptions,
  ALERT_DEFAULT_OPTIONS,
  AngularUIModule,
  TOOLTIP_DEFAULT_OPTIONS,
} from 'angular-ui';

@NgModule({
  imports: [CommonModule, HttpClientModule, AngularUIModule],
  exports: [CommonModule, HttpClientModule, AngularUIModule],
  providers: [
    {
      provide: ALERT_DEFAULT_OPTIONS,
      useValue: {
        ttl: 3000,
        maxInstance: 3,
        // dismissable: false
      } as AlertGlobalOptions,
    },
    {
      provide: TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        backgroundColor: `red`,
        textColor: `#fff`,
      },
    },
  ],
})
export class SharedModule {}
