// Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Module imports
import { Breach } from './models/breach.model';
import { Paste } from './models/paste.model';

enum services {
    BREACH = 'breach',
    BREACHED_ACCOUNT = 'breachedaccount',
    BREACHES = 'breaches',
    PASTE_ACCOUNT = 'pasteaccount',
    PWNED_PASSWORD = 'pwnedpassword',
    RANGE = 'range'
}

/**
 * A service that checks passwords against the Have I Been Pwned API.
 * The service currently uses V2 of the HIBP API.
 */
@Injectable({
    providedIn: 'root'
  })
export class PasswordService {
    private hibpApiUrl = 'https://haveibeenpwned.com/api/v2';
    private pwnedPasswordsApiUrl = 'https://api.pwnedpasswords.com';

    constructor(private http: HttpClient) { }

    /*
     * Retrieve the details of a single breach.
     */
    breach(name: string): Observable<Breach> {
        return this.http.get<Breach>(`${this.hibpApiUrl}/${services.BREACH}/${name}`);
    }

    /*
    * Retrieve the details of a single account.
    */
    breachedAccount(email: string): Observable<Array<Breach>> {
        return this.http.get<Array<Breach>>(`${this.hibpApiUrl}/${services.BREACHED_ACCOUNT}/${email}`);
    }

    /*
     * Retrieve the details of all breaches.
     */
    breaches(): Observable<Array<Breach>> {
        return this.http.get<Array<Breach>>(`${this.hibpApiUrl}/${services.BREACHES}`);
    }

    /*
     * Retrieve the details of all pastes an account has been in.
     */
    pasteAccount(email: string): Observable<Array<Paste>> {
        return this.http.get<Array<Paste>>(`${this.hibpApiUrl}/${services.PASTE_ACCOUNT}/${email}`);
    }

    /*
     * Retrieve the number of breaches a password has been found in.
     */
    pwnedPassword(password: string): Observable<number> {
        return this.http.get<number>(`${this.pwnedPasswordsApiUrl}/${services.PWNED_PASSWORD}/${password}`);
    }

    /*
    * Retrieve the number of breaches a hash (SHA1) has been found in.
    */
    pwnedHash(hash: string): Observable<number> {
        return this.http.get<number>(`${this.pwnedPasswordsApiUrl}/${services.PWNED_PASSWORD}/${hash}`);
    }

    /*
    * Retrieve the suffixes of hashes thet begin with the provided 5 characters.
    * This method shoul dbe used to protect anonymity.
    */
    range(hash: string): Observable<string> {
        return this.http.get(`${this.pwnedPasswordsApiUrl}/${services.RANGE}/${hash}`, { responseType: 'text' });
    }

}
