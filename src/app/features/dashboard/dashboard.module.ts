import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxImageCompressService } from 'ngx-image-compress';

import { EditorModule } from './components/editor-wrapper/editor/editor.module';
import { EditorWrapperComponent } from './components/editor-wrapper/editor-wrapper.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    EditorWrapperComponent,
    GalleryComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    EditorModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    DashboardRoutingModule,
    MatSidenavModule,
  ],
  providers: [ NgxImageCompressService ],
})
export class DashboardModule { }
