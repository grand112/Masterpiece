import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'editor',
        component: EditorWrapperComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
