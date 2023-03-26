import { Component } from '@angular/core';
import { Docs } from '../../components/docs/docs.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent {
  importAlert = `import { TooltipModule } from '@johnson.lee/angular-ui';`;

  docses: Docs[] = [
    {
      name: `Directives`,
      description: ``,
      columns: [
        {
          name: `TooltipDirective`,
          description: `
          <p>directive to defined tooltip's behavior.</p>
          <br/>
          <p>Selector: [auTooltip]</p>
          <p>Exported as: auTooltip</p>
          `,
          properties: [
            {
              name: `auTooltip: string | TemplateRef<any>; `,
              description: `tooltip directive could represents an embedded template or plain text, depends on what you need.`,
            },
            {
              name: `bg-color: string; `,
              description: `tooltip's backgroud color.`,
            },
            {
              name: `color: string; `,
              description: `tooltip's font color.`,
            },
            {
              name: `position: 'top' | 'bottom' | 'left' | 'right'; `,
              description: `tooltip's position.`,
            },
            {
              name: `activeOnLoaded: boolean; `,
              description: `
              <p>decide the tooltip is triggered or not when the element is loaded.</p>
              <p>default as false.</p>
              `,
            },
          ],
        },
      ],
    },
    {
      name: `Classes`,
      description: ``,
      columns: [
        {
          name: `TooltipGlobalOptions`,
          description: `You can configuare all tooltip's behavior by provide <code>TOOLTIP_DEFAULT_OPTIONS</code> to your feature module.`,
          properties: [
            {
              name: `backgroudColor: string`,
              description: `tooltip's backgroud color.`,
            },
            {
              name: `textColor: string`,
              description: `tooltip's font color.`,
            },
            {
              name: `position: 'top' | 'bottom' | 'left' | 'right'; `,
              description: `tooltip's position.`,
            },
          ],
        },
      ],
    },
  ];
}
