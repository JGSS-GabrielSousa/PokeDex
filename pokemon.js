let pokemon;
const id = getURLParameter("id");

function getURLParameter(parameter){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

async function getPokemonData(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon = await response.json();
    generateHTML();
}

function generateHTML(){
    let title = pokemon.name;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.querySelector("title").innerHTML = title;

    document.querySelector(".container h1").innerHTML = pokemon.name;

    const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name);
    document.querySelector(".container h2").innerHTML = `${elementTypes.join(' | ')}`;

    document.querySelector(".pokemon-image").alt = pokemon.name;
    let imageID = id;
    switch(imageID.length){
        case 1:
            imageID = "00"+imageID;
            break;
        case 2:
            imageID = "0"+imageID;
            break;
        default:
            break;
    }
    document.querySelector(".pokemon-image").src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageID}.png`;
    document.querySelector(".pokemon-image").classList.add(pokemon.types[0].type.name);

    document.querySelector("body").classList.add(pokemon.types[0].type.name);
}

function goBack(){
    location.href = "index.html";
}

getPokemonData()
    .then();