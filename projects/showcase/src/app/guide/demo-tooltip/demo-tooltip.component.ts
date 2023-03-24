import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demo-tooltip',
  templateUrl: './demo-tooltip.component.html',
  styleUrls: ['./demo-tooltip.component.scss'],
})
export class DemoTooltipComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  to(location: string) {
    this.router.navigate([location], {
      relativeTo: this.route,
    });
  }
}
