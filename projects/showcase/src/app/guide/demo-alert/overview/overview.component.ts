import { Component } from '@angular/core';
import { AlertService } from 'angular-ui';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  copyToolTipText = 'Copy';
  currentCode = ``;
  sampleHtmlCode = `
	<!-- place this line of code on the root html -->
	<ac-alert></ac-alert>;

	<!-- usage -->
	<button (click)="alertSuccess()">success<button>
	<button (click)="alertInfo()">info<button>
	<button (click)="alertWarning()">warning<button>
	<button (click)="alertError()">error<button>
	`;

  sampleTsCode = `
	import { AlertService } from '@johnson.lee/angular-ui';
	import { Component, OnInit } from '@angular/core';

	@Component({
		selector: 'app-demo-alert',
		templateUrl: './demo-alert.component.html',
		styleUrls: ['./demo-alert.component.scss'],
	})
	export class DemoAlertComponent {
		// import { AlertService } from @johnson.lee/angular-ui";
		constructor(private alertService: AlertService) {}
		successAlert() {
			this.alertService.successAlert('success message');
		}
		errorAlert() {
			this.alertService.errorAlert('error message');
		}
		warningAlert() {
			this.alertService.warningAlert('warning message');
		}
		infoAlert() {
			this.alertService.infoAlert('info message');
		}
	}
	`;

  alertUsage = `let alertRef = this.alertService.successAlert('message', {
    dismissable: false,
    ...
  });
	`;

  successTemplate = `  <!-- customize your success alert -->
    <ng-template #successTemplate let-alertRef="alertRef">
      <div>
        <p>{{ alertRef.alert.title | translate }}</p>
        <p>{{ alertRef.alert.message | translate }}</p>
        <button *ngIf="alertRef.alert.dismissable" (click)="alertRef.close();">X</button>
      </div>
    </ng-template>
  `;

  infoTemplate = `  <!-- customize your info alert -->
    <ng-template #infoTemplate let-alertRef="alertRef">
      <div>
        <p>{{ alertRef.alert.title | translate }}</p>
        <p>{{ alertRef.alert.message | translate }}</p>
        <button *ngIf="alertRef.alert.dismissable" (click)="alertRef.close();">X</button>
      </div>
    </ng-template>
  `;

  warningTemplate = `  <!-- customize your warning alert -->
    <ng-template #warningTemplate let-alertRef="alertRef">
      <div>
        <p>{{ alertRef.alert.title | translate }}</p>
        <p>{{ alertRef.alert.message | translate }}</p>
        <button *ngIf="alertRef.alert.dismissable" (click)="alertRef.close();">X</button>
      </div>
    </ng-template>
  `;

  errorTemplate = `  <!-- customize your error alert -->
    <ng-template #errorTemplate let-alertRef="alertRef">
      <div>
        <p>{{ alertRef.alert.title | translate }}</p>
        <p>{{ alertRef.alert.message | translate }}</p>
        <button *ngIf="alertRef.alert.dismissable" (click)="alertRef.close();">X</button>
      </div>
    </ng-template>
  `;

  alertFullTemplate = `
  <!-- this example putting alerts to bottom: 20px; left: 5px; z-index: 50; -->
  <ng-template #alertFullTemplate let-alertRefs="alertRefs" let-templates="templates">
    <div class="absolute bottom-20 left-5 z-50">
      <ng-container *ngFor="let alertRef of alertRefs">
        <ac-alert-wrapper [alertRef]="alertRef" [templates]="templates"></ac-alert-wrapper>
      </ng-container>
    </div>
  </ng-template>
  `;

  customizeTemplate = `<ac-alert>
    <ng-template #alertFullTemplate let-alertRefs="alertRefs" let-templates="templates">
      <div class="absolute bottom-20 left-5 z-50">
        <ng-container *ngFor="let alertRef of alertRefs">
          <ac-alert-wrapper [alertRef]="alertRef" [templates]="templates"></ac-alert-wrapper>
        </ng-container>
      </div>
    </ng-template>
    <ng-template #successTemplate let-alertRef="alertRef">
      <div class="bg-green-300 p-5 w-full rounded">
        [{{ alertRef.alert.title | translate }}] {{ alertRef.alert.message | translate }}
      </div>
    </ng-template>
    <ng-template #infoTemplate let-alertRef="alertRef">
      <div class="bg-blue-300 p-5 w-full rounded">
        [{{ alertRef.alert.title | translate }}] {{ alertRef.alert.message | translate }}
      </div>
    </ng-template>
    <ng-template #warningTemplate let-alertRef="alertRef">
      <div class="bg-yellow-600 p-5 w-full rounded">
        [{{ alertRef.alert.title | translate }}] {{ alertRef.alert.message | translate }}
      </div>
    </ng-template>
    <ng-template #errorTemplate let-alertRef="alertRef">
      <div class="bg-red-300 p-5 w-full rounded">
        [{{ alertRef.alert.title | translate }}] {{ alertRef.alert.message | translate }}
      </div>
    </ng-template>
  </ac-alert>
  `;

  alertGlobalConfigSample = `
	@NgModule({
		providers: [
			{
				provide: ALERT_DEFAULT_OPTIONS,
				useValue: { // Type: AlertOption
					ttl: -1,
					...
				}
			}
		]
	})`;

  alertCloseUsage = `alertRef.afterClosed().subscribe(result => {
    console.log(\`result: \${result.action}\`); // Pizza!
  });

  alertRef.close({ action: 'Pizza!' });
	`;

  actionsTsCode = `
  this.alertService
    .infoAlert('nonsense', {
      otherActions: ['cancel', 'recover']
    })
    .afterClosed()
    .subscribe((res) => {
      this.alertService.infoAlert(\`event: \${res.action}\`)
    });
  `;
  showCode = false;

  constructor(private alertService: AlertService) {}

  copyToClipboard(text: string): void {
    this.copyToolTipText = 'Coppied !!';
    setTimeout(() => {
      this.copyToolTipText = 'Copy';
    }, 2000);
    navigator.clipboard.writeText(text || '');
  }

  alertSuccess() {
    this.alertService
      .successAlert('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertError() {
    this.alertService
      .errorAlert('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertWarning() {
    this.alertService
      .warningAlert('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertInfo() {
    this.alertService
      .infoAlert('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertInfoWithActions(...actions: string[]) {
    this.alertService
      .infoAlert('當此訊息消失時，會再彈出此訊息為何關閉的事件。', { otherActions: actions })
      .afterClosed()
      .subscribe((res) => {
        this.alertService.infoAlert(`${res.action}`, { title: `Event` });
      });
  }
}
