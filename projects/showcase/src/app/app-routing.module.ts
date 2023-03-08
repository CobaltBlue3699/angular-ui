import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * 控制ui
 * showHeader:  boolean, default true
 * showSidebar: boolean, default true
 * showFooter:  boolean, default true
 */
const routes: Routes = [
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then((mod) => mod.GuideModule),
    data: {
      showSidebar: true,
      showFooter: false,
    },
  },
  {
    path: '',
    redirectTo: '/guide/index',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true, // 使用 #
      enableTracing: !environment.production, // 這會把每個轉導中發生的事件都輸出到瀏覽器
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
