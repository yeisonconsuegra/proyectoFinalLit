import { LitElement, html, css } from 'lit';
import * as batalla from "./codeBatalla";

export class PokemonesVs extends LitElement {
    static styles = [
        css`
            .container{
                display: flex;
                width: 98%;
                height: 78%;
                border: 1px solid rgb(179 179 179);
                margin-left: 12px;

            }
            .container-foto{
                width: 50%;
                padding: 10px 0 10px 0;
            }
            .btn{
                display: flex;
                height: 30px;
                width: 100%;
                margin-top: 3%;
                align-items: center;
                justify-content: center;
            }
            img{
                width: 75%;
                height: 120px;
                margin-left: 11%;
            }
            .nombre{
                font-size: 17px;
                padding: 1% 14% 1% 14%;
                margin-right: 3%;
                border: 1px dashed black;
            }
            button{
                background-color: rgb(255 236 231);
                border-radius: 8px;
                border: none;
                font-size: 16px;
                font-weight: bold;
                font-family: 'sans-serif';
                padding: 8px 30px 8px 30px;
                border-top: 1px solid black;
                margin-left: 10px;
                border-bottom: 1px solid black;
            }
            button:hover{
                cursor: pointer;
                background-color: rgb(290 236 150);
            }

            @media (max-width: 1000px){
                .container{
                    display: flex;
                    width: 100%;
                    height: 80%;
                    border: 1px solid rgb(179 179 179);
                    margin-left: 12px;
                }
                .container-foto{
                    width: 50%;
                    padding: 10px 0 10px 0;
                }
                img{
                    width: 75%;
                    height: 175px;
                    margin-left: 11%;
                }
                
            }
            @media (max-width: 680px){
                .container{
                    display: flex;
                    width: 94%;
                    height: 78%;
                    border: 1px solid rgb(179 179 179);
                }
                .container-foto{
                    width: 50%;
                    padding: 10px 0 10px 0;
                }
                img{
                    width: 75%;
                    height: 145px;
                    margin-left: 11%;
                }
            }
        `
    ];

    static get properties() {
        return {
            pokemon: { type: Array, reflect : true }
        };
    }
    constructor(){
        super();
        this.pokemon = [];
    }

    disableBtt(bool){
        this.dispatchEvent(new CustomEvent('disable', { detail: bool, bubbles: true, composed: true})); //envia true o false
    }

    get _template(){
        let scopePokemon = batalla.getPokes(this.pokemon); //pokemones seleccionados
        if(scopePokemon.length >= 2){
            this.disableBtt(true);
        }else{
            this.disableBtt(false);
        }
        //console.log(scopePokemon)
        if(scopePokemon.length > 0 && scopePokemon.length <= 2){
            return html`
            ${scopePokemon.map((character) => html`
                    <div class="container-foto f1">
                        <img src="${character.img}">
                        <div class="btn">
                            <label class="nombre">${character.nombre}</label>
                        </div>
                    </div>
            `)}
        `
        }else{
            return html`
            <div class="container-foto f1">
            <img src="https://http2.mlstatic.com/D_NQ_NP_815284-MCO50379956206_062022-V.jpg">
            <div class="btn">
            <label class="nombre">--------</label>
            </div>
            </div>
            <div class="container-foto f2">
            <img src="https://http2.mlstatic.com/D_NQ_NP_815284-MCO50379956206_062022-V.jpg">
            <div class="btn">
            <label class="nombre">--------</label>
            </div>
            </div>
            `
        }
    }

    render() {
        return html`
       
        <div class="container">
            ${this._template}
        </div>
        <div class="btn">
            <div class="btn-batalla"><button @click="${batalla.battle}">Batalla</button></div>
        </div>
        `;
    }
}
customElements.define('pokemones-vs', PokemonesVs);
