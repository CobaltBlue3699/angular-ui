import { AlertComponent } from './alert.component';
import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { AlertWrapperComponent } from './alert-wrapper.component';

@NgModule({
  declarations: [AlertComponent, AlertWrapperComponent],
  imports: [CommonModule, TranslateModule],
  providers: [AlertService],
  exports: [AlertComponent, AlertWrapperComponent],
})
export class AlertModule {
  private renderer: Renderer2;

  constructor(rendererFactory: ɵDomRendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderer.setStyle(document.body, 'position', 'relative');
  }
}
