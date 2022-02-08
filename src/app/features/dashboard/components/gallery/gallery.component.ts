import { ChangeDetectionStrategy, ChangeDetectorRef,Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ListResult } from 'firebase/storage';
import { forkJoin, Observable,switchMap } from 'rxjs';
import { IGallery } from 'src/app/models/gallery.model';

import { AuthService } from './../../../../services/auth/auth.service';
import { FirestorageService } from './../../../../services/firestorage/firestorage.service';
import { SnackService } from './../../../../services/snack/snack.service';

@UntilDestroy()
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  gallery: IGallery[] = [];
  selectedUrl: string;
  isLoading = false;
  isModalImgLoading = false;

  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

  constructor(
    private firestorage: FirestorageService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private snack: SnackService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getGalleryUrls();
  }

  openDialog(selectedUrl: string): void {
    this.isModalImgLoading = true;
    this.selectedUrl = selectedUrl;
    this.dialog.open(this.dialogContent);
  }

  onModalImgLoaded(): void {
    this.isModalImgLoading = false;
  }

  onImgLoaded(image: IGallery): void {
    image.isLoaded = true;
  }

  private getGalleryUrls(): void {
    this.isLoading = true;
    this.firestorage.getStorageFolder(this.auth.getCurrentUserId()).
      pipe(switchMap((listResult: ListResult) => {
        const itemsDownloadUrls: Observable<string>[] = [];
        listResult.items.forEach(item => itemsDownloadUrls.push(this.firestorage.getFileUrl(item.fullPath)));
        return forkJoin(itemsDownloadUrls);
      })).pipe(untilDestroyed(this)).subscribe({
        next: (galleryUrls: string[]) => {
          galleryUrls.forEach(url => {
            this.gallery.push({
              url,
              isLoaded: false,
            });
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          const message = 'Nie udało się załadować galerii, spróbuj ponownie';
          this.snack.open(message);
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }
}
