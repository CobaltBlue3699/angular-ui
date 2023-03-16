import { Component } from '@angular/core';
import { AlertService } from 'angular-ui';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  copyToolTipText: string = 'Copy';
  currentCode = ``;
  sampleHtmlCode = `
	<!-- place this line of code on the root html -->
	<au-alert></au-alert>;

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
    constructor(private alertService: AlertService) {}
    alertSuccess() {
      this.alertService
        .success('nonsense')
        .afterClosed()
        .subscribe((res) => {
          console.log(res);
        });
    }
    alertError() {
      this.alertService
        .error('nonsense')
        .afterClosed()
        .subscribe((res) => {
          console.log(res);
        });
    }
    alertWarning() {
      this.alertService
        .warning('nonsense')
        .afterClosed()
        .subscribe((res) => {
          console.log(res);
        });
    }
    alertInfo() {
      this.alertService
        .info('nonsense')
        .afterClosed()
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
	`;

  alertUsage = `let alertRef = this.alertService.success('message', {
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
        <au-alert-wrapper [alertRef]="alertRef" [templates]="templates"></au-alert-wrapper>
      </ng-container>
    </div>
  </ng-template>
  `;

  customizeTemplate = `<au-alert>
    <ng-template #alertFullTemplate let-alertRefs="alertRefs" let-templates="templates">
      <div class="absolute bottom-20 left-5 z-50">
        <ng-container *ngFor="let alertRef of alertRefs">
          <au-alert-wrapper [alertRef]="alertRef" [templates]="templates"></au-alert-wrapper>
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
  </au-alert>
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
    console.log(\`result: \${result}\`); // Pizza!
  });

  alertRef.close('Pizza!'});
	`;

  actionsTsCode = `
  this.alertService
    .info('nonsense', {
      otherActions: ['cancel', 'recover']
    })
    .afterClosed()
    .subscribe((closeMsg: string) => {
      his.alertService.info(closeMsg, { title: \`Event\` });
    });
  `;

  ttlTsCode = `
  this.alertService.info('This closes in five seconds', { ttl: 5000 });
  this.alertService.info('Nerver close', { ttl: -1 });
  `
  alertDissmissableTsCode = `
  this.alertService.info('can't be dismiss', {
    dismissable: false
  })
  `
  alertWithTitleTsCode = `
  this.alertService.info('hey', {
    title: 'Your title'
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

  alertWithoutDissmiss(msg: string) {
    this.alertService.info(msg, {
      dismissable: false
    })
  }

  alertTTL(msg: string, ttl: number) {
    this.alertService.info(msg, { ttl });
  }

  alertWithTitle(msg: string, title: string) {
    this.alertService.info(msg, { title });
  }

  alertSuccess() {
    this.alertService
      .success('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertError() {
    this.alertService
      .error('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertWarning() {
    this.alertService
      .warning('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertInfo() {
    this.alertService
      .info('nonsense')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  alertInfoWithActions(...actions: string[]) {
    this.alertService
      .info('it will fire anthor alert that tells you why this alert closed.', {
        otherActions: actions,
      })
      .afterClosed()
      .subscribe((res: string) => {
        this.alertService.info(`${res}`, { title: `Event` });
      });
  }
}
