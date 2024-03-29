import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-alert',
  templateUrl: './demo-alert.component.html',
  styleUrls: ['./demo-alert.component.scss'],
})
export class DemoAlertComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  to(location: string) {
    this.router.navigate([location], {
      relativeTo: this.route,
    });
  }
}
