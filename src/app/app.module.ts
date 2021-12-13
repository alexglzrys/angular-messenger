import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { BootstrapAngularModule } from './bootstrap-angular/bootstrap-angular.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // Soportar ngModel
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ImageCropperModule,
    NgbModule, // Modulo de terceros para cortar imagenes en Angular
               // Modulo que contiene todos los componenes de NGBootstrap que deseo usar en mi aplicación

  ],
  providers: [],
  bootstrap: [AppComponent]   // El componente que se muestra inicialmente en nuestra app (No se recomienda cambiarlo, mejor por ruteo y redireccionamiento)
})
export class AppModule { }
