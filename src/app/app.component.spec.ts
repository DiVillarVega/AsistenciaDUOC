import { Usuario } from './model/usuario';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';


describe('Probar el comienzo de la aplicacion', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('El titulo de la aplicacion deberia ser "Asistencia Duoc"', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Asistencia Duoc');    
  });

});

// describe('AppComponent', () => {
//   it('should create the app', async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//       providers: [provideRouter([])]
//     }).compileComponents();
    
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });
