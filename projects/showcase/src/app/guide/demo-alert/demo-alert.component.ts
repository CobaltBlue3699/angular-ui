import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'angular-ui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-alert',
  templateUrl: './demo-alert.component.html',
  styleUrls: ['./demo-alert.component.scss'],
})
export class DemoAlertComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  to(location: string) {
    this.router.navigate([location], {
      relativeTo: this.route,
    });
  }
}
