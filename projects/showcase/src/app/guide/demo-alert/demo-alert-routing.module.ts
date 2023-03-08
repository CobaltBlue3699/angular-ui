import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { DemoAlertComponent } from './demo-alert.component';
import { ExampleComponent } from './example/example.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: DemoAlertComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'api',
        component: ApiComponent,
      },
      {
        path: 'example',
        component: ExampleComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'overview' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoAlertRoutingModule {}
