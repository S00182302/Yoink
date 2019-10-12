import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-post',
    loadChildren: './create-post/create-post.module#CreatePostPageModule'
  },
  {
    path: 'favorites',
    loadChildren: './favorites/favorites.module#FavoritesPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'followers',
    loadChildren: './pages/followers/followers.module#FollowersPageModule'
  },
  {
    path: 'following',
    loadChildren: './pages/following/following.module#FollowingPageModule'
  },
  {
    path: 'follow-profile',
    loadChildren:
      './pages/follow-profile/follow-profile.module#FollowProfilePageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
