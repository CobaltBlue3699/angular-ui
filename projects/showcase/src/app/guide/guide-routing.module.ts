import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './guide.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: GuideComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
        data: {
          isMenu: true,
          iconHtml: `<i class="fa-solid fa-house"></i>`,
        },
      },
      {
        path: 'alert',
        loadChildren: () =>
          import('./demo-alert/demo-alert.module').then((mod) => mod.DemoAlertModule),
        data: {
          isMenu: true,
          keywords: ['info', 'toast', 'alert'],
          iconHtml: `<i class="fa-solid fa-message"></i>`,
        },
      },
      {
        path: 'tooltip',
        loadChildren: () =>
          import('./demo-tooltip/demo-tooltip.module').then((mod) => mod.DemoTooltipModule),
        data: {
          isMenu: true,
          keywords: ['tooltip', 'info'],
          iconHtml: `<i class="fa-solid fa-question"></i>`,
        },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
