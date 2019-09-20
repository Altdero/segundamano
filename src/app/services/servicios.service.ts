import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor( private _httpClient: HttpClient ) { }

  /**
   * getURL - Genera la petición GET con sus encabezados
   *
   * @private
   * @param {string} query - Ruta de la api
   * @returns {Observable<any>} - Petición
   * @memberof BaseDeDatosService
   */
  private getURL( api: string, query: string ): Observable<any> {
    const url = `${ api }${ query }`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._httpClient.get( url );
  }

  /**
   * login - Valida las credenciales del usuario
   *
   * @param {*} forma - Credenciales del usuario
   * @returns {Observable<boolean>} - Respuesta del servicio
   * @memberof ServiciosService
   */
  login(forma: any): Observable<boolean> {
    if (forma.usuario === 'user' && forma.contrasena === '123456') {
      return of(true);
    }

    return throwError('Incorrect user or password');
  }

  /**
   * obtenerDatosApi - Obtiene la información de la API deseado
   *
   * @param {string} api - API a consultar
   * @param {string} query - Complemento de la URL
   * @returns {Observable<any>} - Información obtenida de la API
   * @memberof ServiciosService
   */
  obtenerDatosApi( api: string, query: string ): Observable<any> {
    return this.getURL(api, query).pipe(
      map( datos => datos )
    );
  }

  /**
   * manejoErrores - Un sencillo manejo de errores
   *
   * @param {*} err - Información del error
   * @memberof ServiciosService
   */
  manejoErrores(err: any) {
    let error = '';

    switch (err.status) {
      case 403:
        error = 'FORBIDDEN ACCESS';
        break;
      case 404:
        error = 'NOT FOUND';
        break;
      default:
        error = 'ERROR';
        break;
    }
    Swal.fire(error, err.error.message, 'error');
  }

}
