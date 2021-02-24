import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage
  },
  {
    path: 'place-detail',
    loadChildren: () => import('./place-detail/place-detail.module').then( m => m.PlaceDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    //TranslateModule.forChild()
  ],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}
