import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Subject, Observable, timer, Subscription, BehaviorSubject, takeUntil } from 'rxjs';
import { defaults } from 'lodash';
import { ALERT_DEFAULT_OPTIONS } from './alert.constants';
import { Nullable } from '../common';

export enum AlertType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export class AlertRef {
  private readonly close$: Subject<string> = new Subject();
  private closeTimer: Nullable<Subscription> = null;

  constructor(public alert: Alert) {
    this.alert.ttl = this.alert.ttl ?? 3000;
    if (this.alert.ttl > 0) {
      this.closeTimer = timer(this.alert.ttl).subscribe(() => {
        this.close(`OVERTIME`);
      });
    }
  }

  close(closeMsg = `MANUAL`) {
    if (this.closeTimer) {
      this.closeTimer.unsubscribe();
    }
    this.close$.next(closeMsg);
    this.close$.complete();
  }

  afterClosed() {
    return this.close$.asObservable();
  }
}

export class AlertGlobalOptions {
  ttl?: number = 3000; // time to live, default as 3sec
  dismissable?: boolean = true;
  maxInstance?: number = 1; // default only 1 instance
}

export class AlertOptions extends AlertGlobalOptions {
  otherActions?: string[] = [];
  title?: string = 'info';
  type?: AlertType = AlertType.INFO;
}

export class Alert extends AlertOptions {
  message: string = ``;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {
  constructor(
    @Inject(ALERT_DEFAULT_OPTIONS)
    @Optional()
    private defaultOptions: AlertGlobalOptions,
  ) {
    this.defaultOptions = defaults(this.defaultOptions, new AlertGlobalOptions());
  }

  private destory$ = new Subject();
  private alertRefs$ = new BehaviorSubject<AlertRef[]>([]);

  ngOnDestroy(): void {
    this.destory$.next(void 0);
    this.destory$.complete();
  }

  success(message: string, options?: AlertOptions) {
    return this._alert(AlertType.SUCCESS, message, defaults(options, { title: 'success' }));
  }

  error(message: string, options?: AlertOptions) {
    return this._alert(AlertType.ERROR, message, defaults(options, { title: 'error' }));
  }

  warning(message: string, options?: AlertOptions) {
    return this._alert(AlertType.WARNING, message, defaults(options, { title: 'warning' }));
  }

  info(message: string, options?: AlertOptions) {
    return this._alert(AlertType.INFO, message, defaults(options, { title: 'info' }));
  }

  private _alert(type: AlertType, message: string, options?: AlertOptions): AlertRef {
    const alert: Alert = {
      type,
      message,
      ...defaults(options, this.defaultOptions),
    };
    const alertRef = new AlertRef(alert);
    alertRef
      .afterClosed()
      .pipe(takeUntil(this.destory$))
      .subscribe(() => {
        const refs = this.alertRefs$.value;
        this.alertRefs$.next(refs.filter((ref: AlertRef) => ref !== alertRef));
      });
    const refs = [alertRef, ...this.alertRefs$.value];
    // close all extra alert
    const extra = refs.splice(alertRef.alert.maxInstance || 1, refs.length);
    extra.forEach((ref) => ref.close());
    this.alertRefs$.next(refs);
    return alertRef;
  }

  asObservable(): Observable<AlertRef[]> {
    return this.alertRefs$.asObservable();
  }
}
