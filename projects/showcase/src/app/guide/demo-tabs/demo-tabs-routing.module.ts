import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { DemoTabsComponent } from './demo-tabs.component';
import { ExampleComponent } from './example/example.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: DemoTabsComponent,
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
export class DemoTabsRoutingModule {}
