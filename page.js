const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const wrapper = document.querySelector('.form-wrapper');
const title = document.querySelector('.titleP h1');

const colors = {
    fire: '#e75c50',
    grass: '#52ab83',
    dark: '#5c4235',
    ghost: '#6954a4',
    ice: '#2fdbea',
    electric: '#ffeb6a',
    water: '#7eaff9',
    steel: '#8a97b2',
    ground: '#DEB887',
    rock: '#F4A460',
    fairy: '#ffa3ff',
    poison: '#bf8fc6',
    bug: '#9ACD32',
    dragon: '#4122d7',
    psychic: '#ed63a2',
    flying: '#B0E0E6',
    fighting: '#A52A2A',
    normal: '#DCDCDC'
};

const generationMap = {
    "generation-i": "Geração I",
    "generation-ii": "Geração II",
    "generation-iii": "Geração III",
    "generation-iv": "Geração IV",
    "generation-v": "Geração V",
    "generation-vi": "Geração VI",
    "generation-vii": "Geração VII",
    "generation-viii": "Geração VIII",
    "generation-ix": "Geração IX"
}

const mainTypes = Object.keys(colors);

const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const speciesResp = await fetch(data.species.url);
    const speciesData = await speciesResp.json();

    let ptEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'pt');

    if (ptEntries.length > 0) {
            flavorText = ptEntries[ptEntries.length - 1].flavor_text.replace(/\n|\f/g, ' ');
        } else {
    let enEntries = speciesData.flavor_text_entries.filter(
        entry => entry.language.name === 'en'
    );
    flavorText = enEntries.length > 0
        ? enEntries[enEntries.length - 1].flavor_text.replace(/\n|\f/g, ' ')
        : 'Texto da Pokédex indisponível';
}
    
    const generation = speciesData.generation.name;

    const fetchEvolutions = async (speciesUrl) => {
    const speciesResp = await fetch(speciesUrl);
    const speciesData = await speciesResp.json();

    const evolutionUrl = speciesData.evolution_chain.url;
    const evolutionResp = await fetch(evolutionUrl);
    const evolutionData = await evolutionResp.json();

    const evolutions = [];
    const traverseChain = (chain) => {
        evolutions.push(chain.species.name);
        if (chain.evolves_to.length > 0) {
            chain.evolves_to.forEach(e => traverseChain(e));
        }
    };

    traverseChain(evolutionData.chain);
    return evolutions;
};
    const evolutions = await fetchEvolutions(data.species.url);

    showPokemon(data, generation, flavorText, evolutions);
};

    const showPokemon = async (poke, generation, flavorText, evolutions) => {
    const rawName = poke.name.split('-')[0];
    const name = rawName[0].toUpperCase() + rawName.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    title.textContent = name;

    const pokeTypes = poke.types.map(t => t.type.name);
    const genName = generationMap[generation] || generation;

    const typeHTML = pokeTypes
    .map(type => `<span class="type ${type}">${type}</span>`)
    .join('');

    
    const evolutionsHTML = await Promise.all(
        evolutions.map(async evoName => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
            const evoData = await res.json();
            const evoDisplayName = evoName[0].toUpperCase() + evoName.slice(1);
            return `
            <div class="evolution">
                <a href="page.html?id=${evoData.id}" target="_blank">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoData.id}.png" alt="${evoDisplayName}"></a>
                <p>${evoDisplayName}</p>
            </div>
        `;
    })
);

const statsHTML = poke.stats.map(stat => {
    const statName = stat.stat.name.toUpperCase();
    const statValue = stat.base_stat;
    const barWidth = (statValue / 255) * 100; 
    return `
      <div class="stat">
        <span class="stat-name">${statName}</span>
        <div class="stat-bar">
          <div class="stat-fill" style="width: ${barWidth}%;"></div>
        </div>
        <span> ${statValue}</span>
      </div>
    `;
}).join('');



    wrapper.innerHTML = `
    <div class="pokemon-card">
        <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
        </div>
        <div class="pokemon-info">
            <h2><strong>Pokédex Data</strong></h2>
            <hr>
            <b><strong><em>${genName}</em></strong></b>
            <hr>
            <p><strong>National ID:</strong><em> #${id}</em></p>
            <hr>
            <p><strong>Nome:</strong><em> ${name}</em></p>
            <hr>
            <p><strong>Tipo:</strong> ${typeHTML}</p>
            <hr>
            <p><strong>Altura:</strong></em> ${poke.height / 10} m</em></p>
            <hr>
            <p><strong>Peso:</strong><em> ${poke.weight / 10} kg</em></p>
            <hr>
            <p><strong>Habilidades:</strong><em> ${poke.abilities.map(a => a.ability.name).join(', ')}</em></p>
            <hr>
        </div>
    </div>

    <div class="text">
        <p><strong>Descrição:</strong><em> ${flavorText}</em></p>
    </div>

    <div class="Container-evolveStats">
        <div class="evolutions-wrapper">
            <h3>Evoluções:</h3>
            <div class="evolutions">${evolutionsHTML.join('')}</div>
        </div>

        <div class="stats-wrapper">
            <h3>Estatísticas:</h3>
            <div class="stats">${statsHTML}</div>
        </div>
    </div>

    `;
};

fetchPokemon(pokemonId);
