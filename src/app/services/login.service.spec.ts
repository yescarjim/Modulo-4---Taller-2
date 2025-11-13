import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// 1.Configurar el cliente HTTP
import { provideHttpClient } from "@angular/common/http";
// Herramientas para SIMULAR lassolicitudes HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

//Definir el grupo de pruebas
describe(`Pruebas del servicio de login`, () => {

    // definir nuestro mock->simulación relacionada con laspeticiones a una API
    let httpMock: HttpTestingController;
    let service: LoginService;
    const credentialMock = {
        email: `pepita@gmail.com`,
        password: `12345`,
    }

    const tokenMock = `ascokskjfjffndjvvsfhsdkfhiak`

    beforeEach(() => {
        // La configuracion inicial del entorno de pruebas
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);


    });


    //2. Definir los casos de prueba

    // Caso 1. sIMULAR La peticion POST para iniciar sesion
    it(`caso 1: Simular la peticion POST para iniciar sesión`, () => {
        const apiUrl = `http://localhost:9000/iniciarSesion`
        const responseMock = { "mensaje": "Inicio de sesión exitoso" }

        service.login(credentialMock.email, credentialMock.password).subscribe(
            (res) => {
                expect(res).toEqual(responseMock);
            }
        )

        // Simulacion de petición a un back
        const req = httpMock.expectOne(apiUrl)// esa simulacion se espera que sea igual a la url dada
        expect(req.request.method).toBe(`POST`)
        req.flush(responseMock)

    });

    it(`Caso 2: Obtener token`, ()=>{
        localStorage.setItem(`token`, tokenMock);
        expect(service.getToken()).toBe(tokenMock)//me debe traer el  token que se guarda en el local storage

    });

    it(`Caso 3: Verificar si esta logueado o no`, ()=>{
        localStorage.setItem(`token`, tokenMock);
        expect(service.isLoggedIn()).toBeTrue();// me debe retornar verdadero

    });

    it (`Caso 4 : Verificar si se cierra sesión`, ()=>{
        localStorage.setItem(`token`, tokenMock);
        service.logout();// primero cierro sesión
        expect(localStorage.getItem(`token`)).toBeNull();


    });



});