const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const NumberOfPokemon = 386 //Generation I, II and III (Red, Green, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire and Emerald)
const spinnerLoading = document.querySelector("#loading")


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const generatePokemonPromises = () => Array(NumberOfPokemon).fill().map((_, index) =>     
    fetch(getPokemonUrl(index+1)).then(response => response.json()))

    
const generateHTML = pokemon => pokemon.reduce((accumulator, {name, id, types}) => {
    const elementTypes = types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name))

    accumulator += `
    <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
    `
    return accumulator
}, '')

    
const insertPokemonIntoPage = pokemon => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemon
}

const removeLoadingSpinner = () => {
    spinnerLoading.remove()
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
    .then(removeLoadingSpinner)