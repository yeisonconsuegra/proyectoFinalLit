var arrayPokemon = []; 

export function inputData(e){
    if(e.target.checked){
        //console.log(e.target.value)
        arrayPokemon.push(e.target.value);
        sendPokes();
    }else{
        arrayPokemon.splice(arrayPokemon.indexOf(e.target.value),1);
        sendPokes();
    }
}

function sendPokes(){
    let container = document.querySelector("proyecto-pokemon").renderRoot.querySelector("div").querySelector("div").querySelector("div");
    container.dispatchEvent(new CustomEvent('eventName', { detail: JSON.stringify(arrayPokemon), bubbles: true, composed: true}));

}

