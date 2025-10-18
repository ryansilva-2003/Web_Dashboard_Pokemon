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
    "generation-i": "Geração 1",
    "generation-ii": "Geração 2",
    "generation-iii": "Geração 3",
    "generation-iv": "Geração 4",
    "generation-v": "Geração 5"
}

const mainTypes = Object.keys(colors);

const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    showPokemon(data);

    const speciesResp = await fetch(data.species.url);
    const speciesData = await speciesResp.json();

    const generation = speciesData.generation.name;
    showPokemon(data, generation);
};

const showPokemon = (poke, generation) => {
    const rawName = poke.name.split('-')[0];
    const name = rawName[0].toUpperCase() + rawName.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    title.textContent = name;

    const pokeTypes = poke.types.map(t => t.type.name);
    const genName = generationMap[generation] || generation;

    wrapper.innerHTML = `
    <div class="pokemon-card">
        <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
        </div>
        <div class="pokemon-info">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>ID:</strong> #${id}</p>
            <p><strong>Geração:</strong> ${genName}</p>
            <p><strong>Tipo:</strong> <a>${pokeTypes.join(', ')}</a></p>
            <p><strong>Altura:</strong> ${poke.height / 10} m</p>
            <p><strong>Peso:</strong> ${poke.weight / 10} kg</p>
            <p><strong>Habilidades:</strong> ${poke.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
    </div>
    `;
};

fetchPokemon(pokemonId);
