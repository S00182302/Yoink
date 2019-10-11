import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'create-post', loadChildren: './create-post/create-post.module#CreatePostPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'my-profile', loadChildren: './my-profile/my-profile.module#MyProfilePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
