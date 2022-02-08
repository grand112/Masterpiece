import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EditorModule } from './components/editor-wrapper/editor/editor.module';
import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    EditorWrapperComponent,
    GalleryComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    EditorModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DashboardRoutingModule,
    MatSidenavModule,
  ],
})
export class DashboardModule { }
