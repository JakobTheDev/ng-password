// Angular impports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ng-password Library
import { PasswordService, PasswordValidator } from 'projects/ng-password-package/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        PasswordService,
        PasswordValidator
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
