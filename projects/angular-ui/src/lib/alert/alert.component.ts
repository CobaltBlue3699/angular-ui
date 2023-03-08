import { AlertRef, AlertService } from './alert.service';
import { Component, OnInit, OnDestroy, ContentChild, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ac-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @ContentChild('alertFullTemplate', { static: false }) alertFullTemplate!: TemplateRef<any>;
  @ContentChild('successTemplate', { static: false }) successTemplate!: TemplateRef<any>;
  @ContentChild('infoTemplate', { static: false }) infoTemplate!: TemplateRef<any>;
  @ContentChild('warningTemplate', { static: false }) warningTemplate!: TemplateRef<any>;
  @ContentChild('errorTemplate', { static: false }) errorTemplate!: TemplateRef<any>;

  private destory$ = new Subject();
  public alertRefs: AlertRef[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService
      .asObservable()
      .pipe(takeUntil(this.destory$))
      .subscribe((alertRefs) => {
        this.alertRefs = alertRefs;
      });
  }

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
  }
}
