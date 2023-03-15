import { Component, Input } from '@angular/core';

export interface DocsNode {
  name: string;
  description: string;
}

export interface Method extends DocsNode {
  parameters?: DocsNode[];
  return?: DocsNode;
}

export interface Column extends DocsNode {
  properties?: DocsNode[];
  methods?: Method[];
}

export interface Docs extends DocsNode {
  columns: Column[];
}

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent {
  @Input() docses!: Docs[];
}
