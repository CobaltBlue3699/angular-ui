import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  copyToolTipText: string = 'Copy';
  currentCode!: string;
  tooltipHtmlCode = `
  <button class="button success" 
    auTooltip="This is a top side tooltip" 
    position="top">
    top
  </button>

  <button class="button info" 
    auTooltip="This is a right side tooltip"
    position="right">
    right
  </button>

  <button class="button warning"
    auTooltip="This is a bottom side tooltip"
    position="bottom">
    bottom
  </button>

  <button class="button error"
    auTooltip="This is a left side tooltip"
    position="left">
    left
  </button>
  `;

  tooltipGlobalConfigSample = `
	@NgModule({
		providers: [
			{
				provide: TOOLTIP_DEFAULT_OPTIONS,
				useValue: { // Type: TooltipGlobalOptions
					backgroundColor: 'red',
					textColor: '#fff',
					position: 'top'
				}
			}
		]
	})`;

  tooltipBackgroundColor = `
  <button auTooltip="Tooltip" 
    position="top" 
    bg-color="skyblue">
    it has a skyblue tooltip
  </button>
  `;

  tooltipColor = `
  <button auTooltip="Tooltip"
    position="top"
    bg-color="#fff"
    color="green">
    it has a tooltip with green text
  </button>
  `;
  activeOnLoaded = `
  <button auTooltip="activeOnLoaded"
    position="top"
    [activeOnLoaded]="true">
    it'll active when the element is loaded
  </button>
  `;

  copyToClipboard(text: string): void {
    this.copyToolTipText = 'Coppied !!';
    setTimeout(() => {
      this.copyToolTipText = 'Copy';
    }, 2000);
    navigator.clipboard.writeText(text || '');
  }
}
