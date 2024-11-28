import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodigoqrComponent } from './codigoqr.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CodigoqrComponent', () => {
  let component: CodigoqrComponent;
  let fixture: ComponentFixture<CodigoqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigoqrComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CodigoqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CodigoqrComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
