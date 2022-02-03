import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';
import { ILoginData } from 'src/app/models/login-data.model';
import { IUserData } from 'src/app/models/user-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FirestoreService } from './../../../../services/firestore/firestore.service';
import { SnackService } from './../../../../services/snack/snack.service';

@UntilDestroy()
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snack: SnackService,
    private firestore: FirestoreService,
    private cdr: ChangeDetectorRef,
  ) { }

  register(loginData: ILoginData): void {
    this.isLoading = true;
    this.authService.register(loginData).pipe(switchMap(() =>
      this.authService.login(loginData))).pipe(untilDestroyed(this)).
      subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
          this.setUserData(loginData);
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.snack.open(error.message);
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }

  private setUserData(loginData: ILoginData): void {
    const userData: IUserData = {
      displayName: loginData.userName,
      email: loginData.email,
      userId: this.authService.getCurrentUserId(),
    };
    this.firestore.setDocument(`users/${userData.userId}`, userData);
  }
}