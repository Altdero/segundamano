import { Component, OnInit } from '@angular/core';

import { ServiciosService } from '../../services/servicios.service';

import { apiChuckBase, apiGiphyBase, giphyAPIKey } from '../../config/general.config';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  loading = true;
  apiKey = localStorage.getItem('giphyAPIKey') || giphyAPIKey;
  categorias: any[] = [];
  categoriaSel = '';
  infoCategoria: any;
  imagen: any;
  result = true;

  constructor( private _servicios: ServiciosService ) {
    this.obtenerCategorias();
  }

  ngOnInit() {
    this.animarChuck('#chuck', 'tada');
    this.loading = false;
  }

  /**
   * animarChuck - Valida las credenciales del usuario para acceder al examen
   *
   * @param {string} element - Elemento HTML al que se le aplicará la animación
   * @param {string} animationName - Animación que se aplicará
   * @memberof PrincipalComponent
   */
  animarChuck(element: string, animationName: string) {
    const node = document.querySelector(element);

    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  /**
   * obtenerCategorias - Obtiene el listado de las categorías de la API "api.chucknorris.io"
   *
   * @memberof PrincipalComponent
   */
  obtenerCategorias() {
    this._servicios.obtenerDatosApi(apiChuckBase, 'categories')
      .subscribe( (res: any) => {
        // console.log(res);
        this.categorias = res;
      }, err => {
        this._servicios.manejoErrores(err);
        this.loading = false;
      });
  }

  /**
   * obtenerInfoCategoria - Obtiene la información de la categoría seleccionada de la API "api.chucknorris.io"
   *
   * @memberof PrincipalComponent
   */
  obtenerInfoCategoria() {
    this.loading = true;
    this.animarChuck('#chuck', 'tada');

    this._servicios.obtenerDatosApi(apiChuckBase, `random?category=${this.categoriaSel}`)
      .subscribe( (res: any) => {
        if (res.value) {
          this.infoCategoria = res.value;
          this.obtenerImagen( this.infoCategoria.split(' ', 3) );
        } else {
          this.result = false;
        }
      }, err => {
        this._servicios.manejoErrores(err);
        this.loading = false;
      });
  }

  /**
   * obtenerImagen - Obtiene la imagen para mostrar de la API "api.giphy.com"
   *
   * @param {string[]} palabras - Arreglo con las 3 primeras palabras para realizar la búsqueda
   * @memberof PrincipalComponent
   */
  obtenerImagen( palabras: string[] ) {
    this._servicios.obtenerDatosApi(apiGiphyBase, `q=${palabras[0]}+${palabras[1]}+${palabras[2]}&api_key=${this.apiKey}&limit=1`)
      .subscribe( (res: any) => {
        if (res.data.length > 0) {
          this.imagen = res.data[0].images.downsized_large.url;
          this.result = true;
        } else {
          this.result = false;
        }
        this.loading = false;
      }, err => {
        this._servicios.manejoErrores(err);
        this.loading = false;
      });
  }

}
