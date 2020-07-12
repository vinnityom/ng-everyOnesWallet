import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'participants',
        loadChildren: () => import('../participants/participants.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('../transactions/transactions.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'result',
        loadChildren: () => import('../result/result.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/participants',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
