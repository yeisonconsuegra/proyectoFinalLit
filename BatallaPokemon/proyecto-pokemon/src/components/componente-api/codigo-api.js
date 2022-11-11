import { LitElement} from 'lit';

export class CodigoApi extends LitElement {
    
    static get properties() {
        return {
            offset: {type : Number, reflect:true},
            method: {type : String},
            dataFinal: {type : Array},
            character:{type: Array }
        }
    }
    
    constructor(){
        super();
        this.character = [];
    }   
    
    
    /*firstUpdated(){
        this.getData();
        this.getData2();
    }*/
    
    
    _senData = (data) => {
        //console.log(this.dataFinal);
        this.dispatchEvent(new CustomEvent('ApiData', {  //envia datos al componente padre mediante un evento
            detail: {data},
            bubbles: true,
            composed: true
        }));
        this.dataFinal =[];
    }

 
    
    getData = (offset) => {
        let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=4`;
    //console.log("ss ", this.offset);
        fetch(url) //le pasamos la url y el methodo
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }else{
                    return Promise.reject(response);   
                }
            }).then((data) => {this._dataFormat(data.results) }).catch((error) => {console.warn("algo ha fallado", error); })
    }

    _senData2 = (data) => {
        this.dispatchEvent(new CustomEvent('ApiData2', {  //envia datos al componente padre mediante un evento
            detail: {data},
            bubbles: true,
            composed: true
        }));
    }

 
    
    getData2 = (offset) => {
        let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=4`;
        fetch(url) //le pasamos la url y el methodo
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }else{
                    return Promise.reject(response);   
                }
            }).then((data) => {this._senData2(data) }).catch((error) => {console.warn("algo ha fallado", error); })
    }

    _dataFormat = (data) => {
        let character = [];
    
        data.forEach((characters) => {
          character.push({
            link: characters.url
          })
        })
        this.wiki = character;    
        this.getDataPoke(this.wiki);
        //console.log(this.wiki)
      }
    
      getDataPoke = (datal) => {
        for (let index of datal){
            fetch(index.link)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }else{
                    return Promise.reject(response);   
                }
            }).then((data) => {this._dataFormat2(data)}).catch((error) => {console.warn("algo ha fallado", error); })
        }
    }

    _dataFormat2 = (data) => {
       
        this.character.push({
          name: data.name,
          img: data.sprites.other.dream_world.front_default,
          ataque: data.stats[1].base_stat,
          vida: data.stats[0].base_stat
        })
        this.dataFinal = this.character;
        this._validateData(this.dataFinal);
    }
    
    _validateData(data){
        if(this.wiki.length <= data.length){
             this._senData(this.dataFinal);
             this.character =[];
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        this.getData(this.offset);
       //console.log("se ejecuto _>>>");
    }

}
customElements.define('codigo-api', CodigoApi);
