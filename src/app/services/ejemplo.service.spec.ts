// importacion de lo necesario 

import { TestBed } from '@angular/core/testing'; //configurar el entorno de pruebas
import { EjemploService } from './ejemplo.service';// servicio o componente que quieran probar

//grupo de pruebas

describe('EjemploService', () => {
  let service: EjemploService;


  // configurar nuestro entorno de pruebas e inyectar lo necesario
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });

// Definir los casos indiviuales de pruebas
  it('Debería sumar 2 números correctamente', () => {
    const resultado = service.suma(2, 5);
    expect(resultado).toBe(7);
  })
});
