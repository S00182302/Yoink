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
              import('../pages/search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'create-post',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/create-post/create-post.module').then(
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
              import('../pages/favorites/favorites.module').then(
                m => m.FavoritesPageModule
              )
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(
                m => m.ProfilePageModule
              )
          }
        ]
      },
      {
        path: 'following',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/following/following.module').then(
                m => m.FollowingPageModule
              )
          }
        ]
      },
      {
        path: 'follow-profile/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/follow-profile/follow-profile.module').then(
                m => m.FollowProfilePageModule
              )
          }
        ]
      }
    ]
  },
  { path: 'tabs', redirectTo: '/tabs/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
