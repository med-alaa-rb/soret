import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'comfirm-pos',
    loadChildren: () => import('./pages/comfirm-pos/comfirm-pos.module').then( m => m.ComfirmPosPageModule)
  },
  {
    path: 'trip-info',
    loadChildren: () => import('./pages/trip-info/trip-info.module').then( m => m.TripInfoPageModule)
  },
  {
    path: 'all-trip',
    loadChildren: () => import('./pages/all-trip/all-trip.module').then( m => m.AllTripPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
