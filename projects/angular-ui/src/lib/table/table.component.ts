import { Component, Directive, TemplateRef } from '@angular/core';

/** Base interface for a cell definition. Captures a column's cell template definition. */
// export interface BaseCellDef {
//   template: TemplateRef<any>;
// }

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
// @Directive({selector: '[cellDef]'})
// export class CellDef implements BaseCellDef {
//   constructor(public template: TemplateRef<any>) {}
// }

/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
// @Directive({selector: '[headerCellDef]'})
// export class HeaderCellDef implements BaseCellDef {
//   constructor(public template: TemplateRef<any>) {}
// }

@Component({
  selector: 'ac-table',
  template: ``,
  styles: [],
})
export class TableComponent {}
