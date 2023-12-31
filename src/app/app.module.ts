import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from './material.modules';

//INICIO INTEGRACION FIREBASE PARA IMAGENES LINEALES EMAIL - REMPLAZO DE DATA URI BASE64

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavbarAdminComponent } from './components/shared/navbar-admin/navbar-admin.component';
import { PerfilAdminComponent } from './components/admin/perfil-admin/perfil-admin.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    TokenComponent,
    NavbarComponent,
    PerfilComponent,
    NavbarAdminComponent,
    PerfilAdminComponent,
    InicioAdminComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //INICIO FIREBASE
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
