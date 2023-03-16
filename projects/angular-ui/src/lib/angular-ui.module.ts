import { NgModule } from '@angular/core';
import { AlertModule, AlertService } from './alert';
import { TableModule } from './table';

@NgModule({
  declarations: [],
  imports: [AlertModule, TableModule],
  exports: [AlertModule, TableModule],
  providers: [AlertService],
})
export class AngularUIModule {}
