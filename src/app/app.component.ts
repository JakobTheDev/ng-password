// Angular imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// App imports
// HIBP Library
import { PasswordService, PasswordValidator } from 'projects/ng-password-package/src/public_api';

@Component({
    selector: 'password-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // Registration form
    registrationForm: FormGroup;

    // loading status
    loading = false;

    // Password minimum length
    passwordminLength = 10;

    // Are we on a mobile device?
    isMobile = false;

    constructor(
        private passwordService: PasswordService,
        private passwordValidator: PasswordValidator,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        // Create the form
        this.registrationForm = this.fb.group(
            {
                email: ['', Validators.required],
                password: ['', [
                    Validators.required,
                    Validators.minLength(this.passwordminLength)],
                    this.passwordValidator.checkPasswordAnon.bind(this.passwordValidator)],
                confirmPassword: ['', Validators.required]
            }, { validator: this.passwordValidator.matchPasswordValidator });

        // Change validation messages based on mobile or desktop
        this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());
    }

    onRegisterClicked(): void {
        // Do something
    }

    // Form control getters
    get email() { return this.registrationForm.get('email'); }
    get password() { return this.registrationForm.get('password'); }
    get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

}
