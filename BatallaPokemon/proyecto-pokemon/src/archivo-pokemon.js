var arrayPokemon = []; 


//este metodo evalua si se marco el checkbox o se desmarco, agregando los pokemones a un array

export function inputData(e){
    //si el checked es true o fue seleccionado
    if(e.target.checked){
        console.log(e.target.checked)
        //agrega el value del input en el array
        arrayPokemon.push(e.target.value);
        sendPokes();
    }else{
        arrayPokemon.splice(arrayPokemon.indexOf(e.target.value),1);
        sendPokes();
    }
}



//envio de pokemones al padre
function sendPokes(){
    let container = document.querySelector("proyecto-pokemon").renderRoot.querySelector("div").querySelector("div").querySelector("div");
    container.dispatchEvent(new CustomEvent('eventName', { detail: JSON.stringify(arrayPokemon), bubbles: true, composed: true}));
}

