import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path:'tabs',
    component:PlacesPage,
    children:[
      {
        path:'discover',//must match id 'discover' on tab button//<ion-tab-button tab="discover">
        children:[
          {
            path:'',
            loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
          },
          {
            path:':placeId',
            loadChildren:()=>import('./discover/place-detail/place-detail.module').then(m=>m.PlaceDetailPageModule)
          }
        ]
      },
      {
        path:'offers',// <ion-tab-button tab="offers">
        children:[
          {
            path:'',
            loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
          },
          {
            path:'new',
            loadChildren:()=>import('./offers/new-offer/new-offer.module').then(m=>m.NewOfferPageModule)
          },
          {
            path:'edit/:placeId',//:dynamicRoute should always be written after hardcoded routes like 'new' above
            loadChildren:()=>import('./offers/edit-offer/edit-offer.module').then(m=>m.EditOfferPageModule)
          }
        ]
      },
      {
        path: '',redirectTo: '/places/tabs/discover',pathMatch: 'full'
      }
    ]
  },
  {
    path: '',redirectTo: '/places/tabs/discover',pathMatch: 'full'//pathMatch ensures there is no cumulative routing from above
    //and the code only routes to /places/tabs/discover exactly fully and not /places/somethingelse
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}

