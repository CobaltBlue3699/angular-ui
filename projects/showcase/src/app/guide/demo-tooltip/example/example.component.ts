import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
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

  tooltipWithTemplate = `
  <button class="button" [auTooltip]="sampleTooltip" bg-color="white" color="red">
    it has an image and some message.
  </button>
  <ng-template #sampleTooltip>
    <div class="min-w-[100px] text-center">
      <img class="m-auto" width="100" src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png">
      <p>{{ 'nonsense' | translate }}</p>
    </div>
  </ng-template>

  <button class="button" [auTooltip]="videoTooltip" bg-color="white" color="red">
    tooltip with video.
  </button>
  <ng-template #videoTooltip>
    <div class="min-w-[100px] text-center">
      <video width="400" muted autoplay loop>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
        Your browser does not support HTML video.
      </video>
    </div>
  </ng-template>
  `;

  copyToClipboard(text: string): void {
    this.copyToolTipText = 'Coppied !!';
    setTimeout(() => {
      this.copyToolTipText = 'Copy';
    }, 2000);
    navigator.clipboard.writeText(text || '');
  }
}
