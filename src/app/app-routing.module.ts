import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
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
    loadChildren: './pages/create-post/create-post.module#CreatePostPageModule'
  },
  {
    path: 'favorites',
    loadChildren: './pages/favorites/favorites.module#FavoritesPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  {
    path: 'profile/:id',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'followers',
    loadChildren: './pages/followers/followers.module#FollowersPageModule'
  },
  {
    path: 'following/:id',
    loadChildren: './pages/following/following.module#FollowingPageModule'
  },
  {
    path: 'follow-profile/:id',
    loadChildren:
      './pages/follow-profile/follow-profile.module#FollowProfilePageModule'
  },
  {
    path: 'editprofile/:id',
    loadChildren: './pages/editprofile/editprofile.module#EditprofilePageModule'
  },
  {
    path: 'continuereg',
    loadChildren: './pages/continuereg/continuereg.module#ContinueregPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
