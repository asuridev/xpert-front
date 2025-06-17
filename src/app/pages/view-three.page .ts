import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FetchService } from '../services/fetch.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'xpert-three',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="w-full flex justify-center">
    <div class="login-container">
      <mat-card class="login-card">
        <div class="login-header">
          <h1 class="login-title">Iniciar Sesión</h1>
          <p class="login-subtitle">Ingresa tus credenciales para Iniciar sesión</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <mat-form-field class="form-field" appearance="fill">
            <mat-label>Email o Usuario</mat-label>
            <input
              matInput
              formControlName="email"
              type="email"
              placeholder="ejemplo@correo.com"
              autocomplete="username"
              >
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              El email es requerido
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              Ingresa un email válido
            </mat-error>
          </mat-form-field>

          <mat-form-field class="form-field" appearance="fill">
            <mat-label>Contraseña</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="hidePassword ? 'password' : 'text'"
              placeholder="Tu contraseña"
              autocomplete="current-password">
            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="hidePassword = !hidePassword"
            >
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es requerida
            </mat-error>
            <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
              La contraseña debe tener al menos 4 caracteres
            </mat-error>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="login-button"
            [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">Iniciar Sesión</span>
            <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
          </button>

        </form>

        <div *ngIf="errorMessage" style="margin-top: 16px; color: #f44336; text-align: center; font-size: 14px;">
          {{ errorMessage }}
        </div>
      </mat-card>
    </div>
    </div>
  `,
})
export default class ViewThree {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly fetchService:FetchService,
    private readonly userService:UserService,
    private readonly snackBar:MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

 async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
      try {
        const response = await this.fetchService.login({email, password});
        this.userService.setEmail(response.email);
        this.userService.setUserId(response.userId);
        this.userService.setIsLogin(true);
      } catch (error) {
        console.log(error);
        this.snackBar.open("Usuario contraseñas invalidas", "Undo");
      }finally{
        this.isLoading = false;
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }


}

