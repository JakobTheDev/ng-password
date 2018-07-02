// Angular imports
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import sha1 from 'sha1';
// App imports
// Models
import { RangeResponse } from './models/rangeResponse.model';
// Services
import { PasswordService } from './ng-password.service';

@Injectable()
export class PasswordValidator {

    constructor(public passwordService: PasswordService) { }

    /**
     * Validator that checks a password against the HIBP API.
     * Returns invalid with the number of instances of accounts being breached with the supplied password.
     */
    checkPassword(control: AbstractControl) {
        return new Promise(resolve => {
            // Query the HIBP API
            this.passwordService.pwnedPassword(control.value)
                .subscribe((numBreaches: number) => {
                    // Return the number of breaches containing the password
                    if (numBreaches) {
                        resolve({ numBreaches: numBreaches });
                    } else {
                        resolve(null);
                    }
                });
        });

    }

    /**
     * Validator that checks a password against the HIBP API.
     * Returns invalid with the number of instances of accounts being breached with the supplied password.
     * This is the anonymous version of the API which uses SHA hashes.
     */
    checkPasswordAnon(control: AbstractControl) {
        return new Promise(resolve => {
            // Take a SHA1 hash of the password
            const passwordHash = sha1(control.value);
            // Query the HIBP API
            this.passwordService.range(passwordHash.substring(0, 5)).subscribe((response: any) => {
                // Parse the response into an array of RangeResponse and check for a matching hash
                this.deserialiseRangeResponses(response).forEach((rangeResponse: RangeResponse) => {
                    if (`${passwordHash.substring(0, 5)}${rangeResponse.suffix}`.toLowerCase() === passwordHash.toLowerCase()) {
                        // Return the number of breaches containing the password
                        resolve({ numBreaches: rangeResponse.count });
                    }
                });
                // Else, rerutn valid
                resolve(null);
            });
        });

    }

    /**
     * Validator that checks that two passwords match.
     * Returns invalid if the passwords don't match.
     */
    matchPasswordValidator(control: FormControl): ValidatorFn {
        // Retrieve the passwords
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;

        // Compare passwords
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ passwordMismatch: true });
        } else {
            return null;
        }

    }

    /*
     * Responses from the HIBP api for the Range API aren;t particularly nice to handle.
     * It's a big block of text, we need to split on carriage returns so we can deserialise
     * into our model.
     */
    private deserialiseRangeResponses(responseString: string): Array<RangeResponse> {
        return responseString.split('\r\n').map((rangeResponse: string) => {
            return new RangeResponse().deserialise(rangeResponse);
        });
    }

}
