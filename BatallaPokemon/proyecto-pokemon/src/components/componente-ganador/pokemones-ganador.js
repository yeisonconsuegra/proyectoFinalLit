import { LitElement, html, css } from 'lit';
import * as da from "../componente-vs/codeBatalla";

export class PokemonesGanador extends LitElement {
    static styles = [
        css`
            .container{
                box-sizing: border-box;
                border: 1px solid rgb(179 179 179);
                margin-bottom: 16px;
                padding-bottom: 8px;
                margin-left: 12px;
            }
            .container h2{
                text-align: center;
                margin-top: 2px;
            }
            .container-pack{
                display: flex;
                justify-content: center;
            }
            img{
                width: 70%;
                height: 120px;
                margin-left: 5%;
                border-radius: 5px;
            }
            .conta-nombre{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cont-btn{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            button{
                background-color: rgb(255 236 231);
                border-radius: 8px;
                border: none;
                font-size: 16px;
                font-weight: bold;
                font-family: 'sans-serif';
                padding: 8px 20px 8px 20px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                margin-left: 15px;
            }
            button:hover{
                cursor: pointer;
                background-color: rgb(290 236 150);
            }

            @media (max-width: 1000px){
                .container{
                    box-sizing: border-box;
                    height: 200px;
                    border: 1px solid rgb(179 179 179);
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                    margin-left: 12px;
                }
            }
            @media (max-width: 680px){
                .container{
                    width: 94%;
                    box-sizing: border-box;
                    height: 200px;
                    border: 1px solid rgb(179 179 179);
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                    margin-left: 12px;
                }
            }
        `
    ];

    static get properties() {
        return {
            ganador: { type: String, reflect : true }
        };
    }

    constructor(){
        super();
        this.ganador = "";
    }


    get _pokeGanador(){
        if(this.ganador === ""){
            return html`
            <div class="container-pack">
                <div><img src="https://http2.mlstatic.com/D_NQ_NP_815284-MCO50379956206_062022-V.jpg"></div>
                <div class="conta-nombre"><label>Nombre pokemon</label></div>
            </div>
            `;
        }else{
            this.ganador = JSON.parse(this.ganador);
            console.log(this.ganador)
            da.saveToLCS(this.ganador);
            return html`
            <div class="container-pack">
                <div><img src="${this.ganador.img}"></div>
                <div class="conta-nombre"><label>${this.ganador.nombre}</label></div>
            </div>
            `;
        }
    }

    // envia este evento al padre para que el padre resetee los datos de los componentes
    _resetiar(){
    this.dispatchEvent(new CustomEvent('reseteo', { detail: true, bubbles: true, composed: true}));
    }


    render() {
        return html`
        <div class="container">
            <h2>Ganador</h2>
            ${this._pokeGanador}
        </div>
        <div class="cont-btn">
            <button class="btn" @click="${this._resetiar}">Nueva Batalla</button>
        </div>

        `;
    }
}
customElements.define('pokemones-ganador', PokemonesGanador);
