import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ng-password Library
import { PasswordService, PasswordValidator } from 'projects/ng-password-package/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PasswordService,
    PasswordValidator
],
  bootstrap: [AppComponent]
})
export class AppModule { }
