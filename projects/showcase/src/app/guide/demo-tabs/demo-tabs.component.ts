import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demo-tabs',
  templateUrl: './demo-tabs.component.html',
  styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  to(location: string) {
    this.router.navigate([location], {
      relativeTo: this.route,
    });
  }
}
