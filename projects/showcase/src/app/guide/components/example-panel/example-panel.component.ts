import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-example-panel',
  templateUrl: './example-panel.component.html',
  styleUrls: ['./example-panel.component.scss'],
})
export class ExamplePanelComponent implements OnInit {
  @Input() name!: string;
  @ContentChild('codeBlock', { static: false }) codeBlock!: TemplateRef<any>;
  @ContentChild('exampleBlock', { static: false }) exampleBlock!: TemplateRef<any>;
  showCode: boolean = false;

  isFirstExample: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const examples = document.body.querySelectorAll('app-example-panel');
    this.isFirstExample = examples[0] === this.el.nativeElement;
  }
}
