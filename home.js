const spinnerLoading = document.querySelector("#loading")
const PokeList = document.querySelector('[data-js="pokedex"]');

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const NumberOfPokemon = 898
const NumberOfPokemonToLoad = 40
let loaded = 0;
let allLoaded = false;


const generatePokemonPromises = toLoad => Array(toLoad).fill().map((_, index) =>     
    fetch(getPokemonUrl(index+1+loaded)).then(response => response.json()))
    

const generateHTML = pokemon => pokemon.reduce((accumulator, {name, id, types}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
    <li class="card ${elementTypes[0]} highlight-on-hover" onclick="viewPokemon('${id}')">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
    `
    return accumulator
}, '')

    
const insertPokemonIntoPage = pokemon => {
    PokeList.innerHTML += pokemon;
    
    loaded += 40;
    if(loaded > NumberOfPokemon){
        loaded = NumberOfPokemon;
        allLoaded = true;
    }
    else if(loaded == NumberOfPokemon){
        allLoaded = true;
    }

    spinnerLoading.style.display = "none";
}


function viewPokemon(id){
    const form = document.querySelector(".view-pokemon-form");
    const input = document.getElementById("form-value");
    input.value = id;
    form.submit();
}


function checkScroll(){
    if(!allLoaded && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        spinnerLoading.style.display = "block";
        setTimeout(loadPokemon, 2000);
    }
}


function loadPokemon(){
    if(loaded < NumberOfPokemon){
        spinnerLoading.style.display = "block";

        let toLoad;
        if(NumberOfPokemonToLoad+loaded > NumberOfPokemon){
            toLoad = NumberOfPokemon-loaded;
        }
        else{
            toLoad = NumberOfPokemonToLoad;
        }
        
        const pokemonPromises = generatePokemonPromises(toLoad);

        Promise.all(pokemonPromises)
            .then(generateHTML)
            .then(insertPokemonIntoPage);
    }
}

loadPokemon();
setInterval(checkScroll, 1000);