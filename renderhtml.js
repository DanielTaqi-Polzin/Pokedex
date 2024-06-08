function renderAllPokemonHtml(typeBadges, pokemon) {
    return /*html*/ `
    <main onclick="openCard(${pokemon.id})">
        <div class="card-size">
            <header class="header-card">
                <div>
                    <span>#${pokemon.id}</span>
                </div>
                <div>
                    <span>${pokemon.name}</span>
                </div>
            </header>
            <section>
                <div class="body-card">
                    <img class="pokemon-size" src="${pokemon.sprites.other.dream_world.front_default}" alt="">
                </div>
            </section>
            <footer class="footer-card bg_${pokemon.types[0].type.name}">
                <div>
                    ${typeBadges}
                </div>
            </footer>
        </div>
    </main>
    `;
}

function renderMainPokemonHtml(pokemon, mainType, typeBadges) {
    return /*html*/ `
    <main class="container-open-card">
        <header class="header-open-card">
            <div>
                <span>#${pokemon.id}</span>
            </div>
            <div>
                <span>${pokemon.name}</span>
            </div>
            <div class="button-size-close">
                <button class="button" onclick="closeCard()">schließen</button>
            </div>
        </header>
        <div class="border">
            <section class="body-top-open-card">
                <div>
                    <div class="nav-arrow left-arrow" onclick="navigatePokemon(${pokemon.id}, -1)"><img src="./img/Pfeil-links.png" alt=""></div>
                </div>
                <div>
                    <img class="pokemon-open-card-size" src="${pokemon.sprites.other.dream_world.front_default}" alt="">
                </div>
                <div>
                    <div class="nav-arrow right-arrow" onclick="navigatePokemon(${pokemon.id}, 1)"><img src="./img/Pfeil Rechts.png" alt=""></div>
                </div>
            </section>
            <section class="body-bottom-open-card bg_${mainType}">
                <div>
                    <div>${typeBadges}</div>
                </div>
            </section>
        </div>
        <footer class="footer-open-card">
            <section class="button-size">
                <div>
                    <button onclick="renderMainPokemon(currentPokemon)" class="button">main</button>
                </div>
                <div>
                    <button onclick="renderStatsPokemon(currentPokemon)" class="button">stats</button>
                </div>
            </section>
            <table class="data-pokemon">
                <tr>
                    <td>Höhe:</td>
                    <td>${pokemon.height} m</td>
                </tr>
                <tr>
                    <td>Gewicht:</td>
                    <td>${pokemon.weight} kg</td>
                </tr>
                <tr>
                    <td>Basis-Erfahrung:</td>
                    <td>${pokemon.base_experience}</td>
                </tr>
                <tr>
                    <td>Fähigkeiten:</td>
                    <td>${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</td>
                </tr>
            </table>
        </footer>
    </main> 
    `;
}

function renderStatsPokemonHtml(pokemon, typeBadges, mainType) {
    return /*html*/ `
    <main class="container-open-card">
        <header class="header-open-card">
            <div>
                <span>#${pokemon.id}</span>
            </div>
            <div>
                <span>${pokemon.name}</span>
            </div>
            <div class="button-size-close">
                <button class="button" onclick="closeCard()">schließen</button>
            </div>
        </header>
        <div class="border">
            <section class="body-top-open-card">
                <div>
                    <div class="nav-arrow left-arrow" onclick="navigatePokemon(${pokemon.id}, -1)"><img src="./img/Pfeil-links.png" alt=""></div>
                </div>
                <div>
                    <img class="pokemon-open-card-size" src="${pokemon.sprites.other.dream_world.front_default}" alt="">
                </div>
                <div>
                    <div class="nav-arrow right-arrow" onclick="navigatePokemon(${pokemon.id}, 1)"><img src="./img/Pfeil Rechts.png" alt=""></div>
                </div>
            </section>
            <section class="body-bottom-open-card bg_${mainType}">
                <div>
                    <div>${typeBadges}</div>
                </div>
            </section>
        </div>
        <footer class="footer-open-card">
            <section class="button-size">
                <div>
                    <button onclick="renderMainPokemon(currentPokemon)" class="button">main</button>
                </div>
                <div>
                    <button onclick="renderStatsPokemon(currentPokemon)" class="button">stats</button>
                </div>
            </section>
            <table class="data-pokemon">
                ${pokemon.stats.map(stat => `
                <tr>
                    <td>${stat.stat.name}:</td>
                    <td>${stat.base_stat}</td>
                </tr>`).join('')}
            </table>
        </footer>
    </main> 
    `;
}