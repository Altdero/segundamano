import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServiciosService } from '../services/servicios.service';

import { giphyAPIKey } from '../config/general.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rutaAcceso: string;
  forma: FormGroup;
  hide = true;
  error = false;
  mensajeError: string;

  constructor(
    private _router: Router,
    private _servicios: ServiciosService
  ) {
    this.forma = new FormGroup({
      usuario: new FormControl( '', [Validators.required] ),
      contrasena: new FormControl( '', [Validators.required] ),
      apikey: new FormControl( giphyAPIKey ),
    });
  }

  ngOnInit() {
    localStorage.removeItem('logueado');
    localStorage.removeItem('giphyAPIKey');
    this.rutaAcceso = localStorage.getItem('rutaAcceso') || '/principal';
    localStorage.removeItem('rutaAcceso');
  }

  /**
   * acceder - Valida las credenciales del usuario para acceder al examen
   *
   * @memberof LoginComponent
   */
  acceder() {
    this._servicios.login(this.forma.value).subscribe( (res: boolean) => {
      this.error = false;
      localStorage.setItem('logueado', 'true');
      localStorage.setItem('giphyAPIKey', this.forma.controls.apikey.value || giphyAPIKey);
      this._router.navigate([this.rutaAcceso]);
    }, (err: string) => {
      this.error = true;
      this.mensajeError = err;
    } );
  }

}
