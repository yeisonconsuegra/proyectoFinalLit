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

//batalla de los dos pokemones

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

// guardar informacion de pokemones ganadores al local storage
export function saveToLCS(data) {
    let key = "wons";
    let nombre = data.nombre;
    this.verGetLocalData(key, nombre);
  }
  
  // Obtener los datos almacenados en el local storage
  export function verGetLocalData(key, name) {
    let localSave = [];
    const item = localStorage.getItem(key);
    if (item !== null) {
      findPokeData(name, JSON.parse(item));
    } else {
      localSave.push({ nombre: name, battles: 1 });
      localStorage.setItem(key, JSON.stringify(localSave));
    }
  }
  
  // buscar un pokemon en los datos del local storage
  export function findPokeData(nombre, data) {
    let bool = false;
    data.forEach(element => {
      if (element.nombre === nombre) {
        element.battles += 1;
        bool = true;
      }
    });
    if (!bool) {
      data.push({ nombre: nombre, battles: 1 });
    }
    localStorage.setItem("wons", JSON.stringify(data));
  }

//guardar datos con partidas ganadas

  export function _formatData(data) {
    let batt = selectBattlesPokes();
    let pokes = [];
    data["data"].forEach(poke => {
      let battG = 0;
      batt.forEach(elmt => {
        if (poke.name === elmt.nombre) {
          battG = elmt.battles;
        }
      });
      pokes.push({
        name: poke.name,
        img: poke.img,
        vida: poke.vida,
        ataque: poke.ataque,
        wons: battG
      });
    });
    return pokes;
  }
  
  export const selectBattlesPokes = () => {
    let localSave = localStorage.getItem("wons");
    if (localSave !== null) {
      //console.log('LocalStorage: ', JSON.parse(localSave));
      return JSON.parse(localSave);
    }
    return [];
  };


  //actualiza el numero de batalla del pokemon
  export function actualizarBatalla(){
    let cpok = document.querySelector("proyecto-pokemon").renderRoot.querySelector("div").querySelector("div").querySelector("codigo-api");
    setTimeout(() => {
      cpok.setAttribute("offset", 4);
    }, "40");

    setTimeout(() => {
      cpok.setAttribute("offset", 0);
    }, "40");
  }