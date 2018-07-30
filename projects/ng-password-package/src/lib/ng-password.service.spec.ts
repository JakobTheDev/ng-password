// Angular imports
import { TestBed, inject } from '@angular/core/testing';
// App imports
import { PasswordService } from './ng-password.service';

describe('PasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordService]
    });
  });

  it('should be created', inject([PasswordService], (service: PasswordService) => {
    expect(service).toBeTruthy();
  }));
});
