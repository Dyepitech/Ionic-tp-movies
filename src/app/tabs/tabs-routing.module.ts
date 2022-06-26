import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
      path: '',
      component: TabsPage,
      children: [
        {
          path: 'home',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
        },
        {
            path: 'top',
            loadChildren: () => import('../top/top.module').then( m => m.TopPageModule)
        },
        {
            path: 'actual',
            loadChildren: () => import('../actual/actual.module').then( m => m.ActualPageModule)
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
