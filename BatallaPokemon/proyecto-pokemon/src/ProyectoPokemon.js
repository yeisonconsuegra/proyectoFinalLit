import { LitElement, html, css } from 'lit';
import "./components/componente-api/pokemones-all";
import "./components/componente-api/codigo-api";
import "./components/componente-vs/pokemones-vs";
import "./components/componente-ganador/pokemones-ganador";
import * as funciones from "./archivo-pokemon";
import * as dataquita from "./components/componente-vs/codeBatalla";


export class ProyectoPokemon extends LitElement {
  static get properties() {
    return {
      pokemones: {type : Array},
      paginacion: {type : Array},
      offset: {type:Number},
    }
  }


  static get styles() {
    return css`
    .container-global{
      border: 1px solid grey;
      width: 50%;
      margin: auto;
      padding: 7px 20px 20px 20px;
      border-radius: 10px;
    }
     .container-poke{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        height: 470px;
        width: 100%;
        margin: 0 auto;
    }
    h1{
      font-family: 'sans-serif';
      text-align: center;
      color: #a70036;
      margin-bottom: 0;
      margin-top: 0;
    }
    .derecha{
      display: flex;
      flex-direction: column;
      width: 50%;
    }
    pokemones-vs{
      height: 50%;
    }
    pokemones-ganador{
      height: 50%;
      margin: 0px;
    }
    pokemones-all{
  
    }
    .card{
      background: #fff;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      height: 82px;
      width: 90%;
      margin: 12px 0 12px 0;
      text-align: center;
    }
    .card img {
      width: 90%;
      height: 90%;
      margin-top: 2px;
    }
    .img-poke{
      width: 30%;
      height: 89px;
      object-fit: cover;
      border: 1px solid grey;
      border-radius: 10px;
    }
    .card-contend{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 50%;
      height: 65px;
      padding: 0px;
      border: 1px solid grey;
      margin: auto;
    }
    .poke{
      width: 50%;
    }
    .nombre-cont{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 70px;
      margin: auto;
    }
    .letra{
      margin: 0 auto 0 4px;
      font-size: 13px;
    }
    hr{
      width: 90%;
      margin: 0;
    }
    input{
      margin-right: 10px;
    }
    .pag{
      width: 80%;
      height: 40px;
      display: flex;
      justify-content: center;
    }
    button{
      margin: 8px;
      background-color: rgb(255 236 231);
      border: 1px 0 1px 0 solid grey;
      border-radius: 3px;
      padding: 2px;
    }
    button:hover{
      cursor: pointer;
      background-color: rgb(290 236 150);
    }
    @media (max-width: 1000px){
      .container-global{
        width: 65%;
        margin: auto;
        padding: 7px 20px 20px 20px;
        border-radius: 10px;
      }
      .container-poke{
        box-sizing: border-box;
        display: block;
        height: 1100px;
        width: 100%;
        margin: 0 auto;
    }
    .poke{
      width: 100%;
      height: 440px;
      display: block;
      border: 1px solid grey;
      border-radius: 10px;
    }
    h1{
      margin-bottom: 10px;
      display: block;
      height: 40px;
      width: 100%;
      background-color: yellow;
    }
    .derecha{
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 15px auto 0 auto;
    }
    pokemones-vs{
      height: 300px;
      margin-bottom: 20px;
    }
  }
    @media (max-width: 680px){
      .container-global{
        width: 100%;
        min-width: 350px;
        padding: 7px 20px 20px 20px;
        border-radius: 10px;
      }
      .derecha{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 15px auto 0 auto;
      }

    }
    `;
  }

  constructor(){
    super();
    this.pokemones = [];
    this.paginacion = [];
    this.pokes = [];
    this.offset = 0; 

    //obtenemos el dato de codigo-api.js
    this.addEventListener('ApiData', (e)=>{
      this.pokemones = dataquita._formatData(e.detail);
    });


    //obtenemos el dato de archivo pokemones.js y se lo enviamos al hijo pokemones-vs.js
    this.addEventListener('eventName', (e) => {
      let bla = this.shadowRoot.querySelector('pokemones-vs');
      //se lo agregamos al parametro que fue inicializado en el componente pokemones-vs.js
      bla.setAttribute('pokemon', e.detail);
    });


    //obtenemos el dato de archivo pokemones-vs.js para desabilitar los checkbox
    this.addEventListener('disable', (e) => {
      if(e.detail === true){
        this.disable();
      }else{
        this.enable();
      }      
    });


    ////obtenemos el dato de archivo codeBatalla.js que nos dice el ganador y se lo pasamos al archivo hijo pokemones-ganador.js
    this.addEventListener('ganador', (e) => {
      let bla = this.shadowRoot.querySelector('pokemones-ganador');
      //se lo agregamos al parametro que fue inicializado en el componente pokemones-ganador.js
      bla.setAttribute('ganador', e.detail);
    });



    //obtenemos el dato de archivo pokemones-ganador.js para resetear los datos
    this.addEventListener('reseteo', (e) => {
      let pokeGanador = this.shadowRoot.querySelector("pokemones-ganador");
      pokeGanador.setAttribute("ganador", "")
      dataquita.actualizarBatalla();
    let pokeVs = this.shadowRoot.querySelector("pokemones-vs");
      pokeVs.setAttribute("pokemon", "[]")
    });
  }

  pagSig(){
    this.offset += 4; 
   // console.log(this.offset);
  }

  pagAnt(){
    if(this.offset <= 0){
      this.offset = 0; 
    }else{
      this.offset -= 4; 
    }
   // console.log(this.offset);
  }

  pagHome(){
    this.offset = 0; 
   // console.log(this.offset);
  }

  disable(){
    const bttons = this.shadowRoot.querySelectorAll('input[type=checkbox]:not(:checked)'); 
        bttons.forEach(ev =>{
            ev.disabled = true;
        });
  }

  enable(){
    const bttons = this.shadowRoot.querySelectorAll('input[type=checkbox]:not(:checked)'); 
        bttons.forEach(ev =>{
            ev.disabled = false;
        });
  }

  render() {
    return html`
      <div class="container-global">
        <h1>Batalla Pokemon</h1>
        <div class="container-poke">
          <pokemones-all></pokemones-all>
          <codigo-api offset="${this.offset}"></codigo-api>
          <div class="poke">
          ${this.dateTemplate}
          <nav class="pag">
          <button @click="${this.pagAnt}">Atras</button>
          <button @click="${this.pagHome}">Home</button>
          <button @click="${this.pagSig}">Siguiente</button>
        </nav>
          </div>
          <div class="derecha">
              <pokemones-vs ></pokemones-vs>
              <pokemones-ganador></pokemones-ganador>
          </div>
        </div>
      </div>
    `;
  }


  /*_botonPage(data){
    const btn = this.shadowRoot.querySelector('nav');
    const previus = data.previous ? `<a href="${data.previous}"><<</a>` : "";
    const nesty = data.next ? `<a href="${data.next}">>></a>` : ""; 

    btn.innerHTML = previus + " " + nesty;
  }*/


  
  get dateTemplate(){
    //console.log("tamaño", this.pokemones.length);
    return html`
      ${this.pokemones.map(character => html`
        <div class="card">
        <input type="checkbox" @change="${funciones.inputData}" .value='{"nombre" : "${character.name}", "img" : "${character.img}", "ataque" : ${character.ataque}, "vida" : ${character.vida}}'>
        <div class="img-poke"><img src="${character.img}"></div>
          <div class="card-contend">
            <div class="nombre-cont">
                <label class="letra">Nombre: ${character.name}</label>
                <p class="letra">Vida : ${character.vida}</p>
                <p class="letra">Ataque : ${character.ataque}</p>
                <p class="letra">Partidas ganadas : ${character.wons}</p>
            </div>
          </div>
        </div>
        <hr>
      `)}
    `;
  }


}