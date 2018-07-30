# ng-password

A collection of tools that test password strength.

The demo is an example user registration flow which leverages the Have I Been Pwned API V2 to test for insecure passwords. Rather than requiring users to register a password that meets an arbitrary set of complexity rules, this registration form requires two things:

* The password must be at least 10 characters.
* The password must not be in the Have I Been Pwned database.

[**Demo**](https://jakob.pennington.io/ng-password)

**PS:** The register button does nothing... yet!

## Installation

Install the npm package.

```
npm install ng-password --save
```

Import the PasswordService and PasswordValidator into your ```app.module.ts```. You'll also need to import **HttpClientModule** and **ReactiveFormsModule**.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// ng-password Library
import { PasswordService, PasswordValidator } from 'ng-password';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        PasswordService,
        PasswordValidator
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

```

## Usage

Import the PasswordService and PasswordValidator into your component and inject them into the constructor.

```typescript
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// HIBP Library
import { PasswordService, PasswordValidator } from 'ng-haveibeenpwned';

@Component({
    selector: 'hibp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ...

    constructor(
        private passwordService: PasswordService,
        private passwordValidator: PasswordValidator,
        private fb: FormBuilder
    ) { }

   ...
```

## Validators

The PasswordValidator currently has three validators:

* **checkPassword:** Test the password against the HIBP API using the non-anonymous **pwnedpassword** API. Returns the number of breaches the password has been pwned in in the **numBreaches** validator response.

* **checkPasswordAnon:** Test the password using the anonymous **pwnedRange** API. In this API, the password is SHA1 hashed and the first five characters are sent to the API. The API responws with the hash-suffixes what have the same hash-prefix, along with the number of breaches the has appeared in. The prefix is then joined with each of the suffixes and compared with the original password hash. **TL;DR** the full password is never sent to the API, protecting your anonymity.

* **matchPasswordValidator:** A form validator that compares two passwords submitted in the password and confirmPassword form fields.

```typescript
// Password minimum length
passwordminLength = 10;

this.registrationForm = this.fb.group(
    {
        email: ['', Validators.required],
        password: ['', [
            Validators.required,
            Validators.minLength(this.passwordminLength)],
            this.passwordValidator.checkPasswordAnon.bind(this.passwordValidator)],
        confirmPassword: ['', Validators.required]
    }, { validator: this.passwordValidator.matchPasswordValidator });
```


## Service

The PasswordService supports each of the API endpoints offered by the Have I Been Pwned V2 API. The services return an observable, so they can be used like this:

```typescript
this.passwordService.pwnedPassword('Password01')
    .subscribe((numBreaches: number) => {
        // Return the number of breaches containing the password
        console.log('This password has appeared in ' + numBreaches + ' breaches.');
    });
```

## Can I use this code?

Of course you can, go your hardest! I'll soon be creating an NPM package so you can easily import the PasswordService and password validator into your own project.

## Thanks

Many thanks to fellow Australian Troy Hunt for creating [Have I Been Pwned](https://haveibeenpwned.com/) and the [API](https://haveibeenpwned.com/API/v2) used in this project. This project has been built using the [Angular CLI](https://github.com/angular/angular-cli) and [Clarity](https://github.com/vmware/clarity).
