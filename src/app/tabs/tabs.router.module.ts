import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'create-post',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create-post/create-post.module').then(
                m => m.CreatePostPageModule
              )
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favorites/favorites.module').then(
                m => m.FavoritesPageModule
              )
          }
        ]
      },
      {
        path: 'my-profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(
                m => m.ProfilePageModule
              )
          }
        ]
      }
      // {
      //   path: '',
      //   redirectTo: '/start/home',
      //   pathMatch: 'full'
      // }
      // { path: '', redirectTo: '/start/tabs/tab1', pathMatch: 'full' }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/home',
  //   pathMatch: 'full'
  // }
  { path: 'tabs', redirectTo: '/tabs/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
