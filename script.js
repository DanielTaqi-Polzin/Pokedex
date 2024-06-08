const maxPokemon = 1025;
const pageSize = 20;
let currentOffset = 0;
let currentPokemon = null;

let pokemonData = [];

window.onload = () => {
    render();
    document.getElementById('load-more-button').addEventListener('click', loadMorePokemon);
};

function render() {
    fetchData(currentOffset);
    currentOffset += pageSize;
}

function showSpinner() {
    document.getElementById('pokeballSpinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('pokeballSpinner').style.display = 'none';
}


async function fetchData(offset) {
    showSpinner();
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
        let responseAsJson = await response.json();
        let promises = responseAsJson.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        let allPokemonData = await Promise.all(promises);
        // Füge die abgerufenen Daten zum pokemonData-Array hinzu
        allPokemonData.forEach(pokemon => {
            pokemonData.push({
                id: pokemon.id,
                name: pokemon.name,
                sprites: pokemon.sprites,
                types: pokemon.types
            });
        });
        renderAllPokemon(pokemonData);
    } finally {
        hideSpinner();
    }
}

function renderAllPokemon(pokemonData) {
    let pokemonContent = document.getElementById('pokemonContent');
    pokemonContent.innerHTML = ''; // Vorherigen Inhalt löschen
    for (let i = 0; i < pokemonData.length; i++) {
        let pokemon = pokemonData[i];
        let typeBadges = pokemon.types.map(typeInfo => {
            let typeName = typeInfo.type.name;
            return `<img
                class="poke-element-icon"
                src="./img/Pokemon-${typeName}-icon.png"
                title="${typeName}"
                alt="${typeName}"/>`;
        }).join(' ');
        pokemonContent.innerHTML += renderAllPokemonHtml(typeBadges, pokemon);
    }
}

function filterNames() {
    let search = document.getElementById('search').value.toLowerCase();
    let filteredPokemon = pokemonData.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search);
    });
    renderAllPokemon(filteredPokemon);
}

async function fetchPokemonData(pokemonId) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    let pokemonData = await response.json();
    currentPokemon = pokemonData;
    renderMainPokemon(pokemonData);
}

function renderMainPokemon(pokemon) {
    let pokemonContentOpenCard = document.getElementById('pokemonContentOpenCard');
    pokemonContentOpenCard.innerHTML = ''; // Vorherigen Inhalt löschen
    let typeBadges = pokemon.types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<img
            class="poke-element-icon"
            src="./img/Pokemon-${typeName}-icon.png"
            title="${typeName}"
            alt="${typeName}"/>`;
    }).join(' ');
    let mainType = pokemon.types[0].type.name;
    pokemonContentOpenCard.innerHTML = renderMainPokemonHtml(pokemon, mainType, typeBadges)
    document.getElementById('cardOpen').classList.remove('d-none');
}

function renderStatsPokemon(pokemon) {
    let pokemonContentOpenCard = document.getElementById('pokemonContentOpenCard');
    pokemonContentOpenCard.innerHTML = ''; // Vorherigen Inhalt löschen
    let typeBadges = pokemon.types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<img
            class="poke-element-icon"
            src="./img/Pokemon-${typeName}-icon.png"
            title="${typeName}"
            alt="${typeName}"/>`;
    }).join(' ');
    let mainType = pokemon.types[0].type.name;
    pokemonContentOpenCard.innerHTML = renderStatsPokemonHtml(pokemon, typeBadges, mainType);
    document.getElementById('cardOpen').classList.remove('d-none');
}

function loadMorePokemon() {
    if (currentOffset < maxPokemon) {
        fetchData(currentOffset);
        currentOffset += pageSize;
    }
    if (currentOffset >= maxPokemon) {
        document.getElementById('load-more-button').disabled = true;
        document.getElementById('load-more-button').innerText = "Keine weiteren Pokémon zu laden";
    }
}

function openCard(pokemonId) {
    fetchPokemonData(pokemonId);
    document.body.classList.add('no-scroll');
}

function closeCard() {
    document.getElementById('cardOpen').classList.add('d-none');
    document.body.classList.remove('no-scroll');
}

function navigatePokemon(pokemonId, direction) {
    let newId = pokemonId + direction;
    if (newId > 0 && newId <= maxPokemon) {
        fetchPokemonData(newId);
    }
}




