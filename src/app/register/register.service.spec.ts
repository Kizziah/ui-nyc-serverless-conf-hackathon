import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: 
	  	[
				RouterTestingModule,                
	      ReactiveFormsModule,
	      HttpClientModule
      ]  	
  }));

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });
});
