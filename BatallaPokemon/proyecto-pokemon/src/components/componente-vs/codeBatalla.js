var pokemonesTotal = [];
var ganador = [];

export const getPokes = (pkk) => {
    let tempArr = [];
    pkk.forEach((element) => {
        tempArr.push(JSON.parse(element));
    });

    pokemonesTotal = tempArr;
    return pokemonesTotal;
}

export function battle(){
    let golpeaPrimero = pokemonesTotal[Math.floor(Math.random() * pokemonesTotal.length)];
    let pokemonGanador = peleaPokemones(golpeaPrimero)
    let container = document.querySelector("proyecto-pokemon").renderRoot.querySelector("div").querySelector("div").querySelector("pokemones-vs");
    container.dispatchEvent(new CustomEvent('ganador', { detail: JSON.stringify(pokemonGanador), bubbles: true, composed: true}));
}

export function peleaPokemones(primerGolpe){
    let bandera = 0;
    //pokemon primario
    let primerPoke = primerGolpe.nombre;
    let vidaPrimerPoke = primerGolpe.vida;
    let ataquePrimerPoke = primerGolpe.ataque;

    //pokemon secundario
    let pokemonDos = pokemonesTotal.find(poke => poke.nombre !== primerPoke);
    let vidaPokemonDos = pokemonDos.vida;
    let ataquePokemonDos = pokemonDos.ataque;

    // console.log("primer golpe: ",primerGolpe, "ataque: ", ataquePrimerPoke)
    // console.log("segundo golpe: ",pokemonDos, "ataque: ", pokemonDos.ataque)

    for (let i = 1; i > 0;) {
        if(ataquePrimerPoke > vidaPokemonDos){
            ganador = primerGolpe;
            i = bandera;
            break;
        }else{
            vidaPokemonDos - ataquePrimerPoke
        }
        if (ataquePokemonDos > vidaPrimerPoke){
            ganador = pokemonDos;
            i = bandera;
            break;
        }else{
            vidaPrimerPoke - ataquePokemonDos
        }
    }
   return ganador;
}

