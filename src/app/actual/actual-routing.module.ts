import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualPage } from './actual.page';

const routes: Routes = [
  {
    path: '',
    component: ActualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualPageRoutingModule {}
