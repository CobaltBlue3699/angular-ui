import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-example-panel',
  templateUrl: './example-panel.component.html',
  styleUrls: ['./example-panel.component.scss'],
})
export class ExamplePanelComponent {
  @Input() name!: string;
  @ContentChild('codeBlock', { static: false }) codeBlock!: TemplateRef<any>;
  @ContentChild('exampleBlock', { static: false }) exampleBlock!: TemplateRef<any>;
  showCode: boolean = false;
}
