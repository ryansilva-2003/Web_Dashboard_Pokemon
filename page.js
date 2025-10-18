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
    "generation-v": "Geração V"
}

const mainTypes = Object.keys(colors);

const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    showPokemon(data);

    const speciesResp = await fetch(data.species.url);
    const speciesData = await speciesResp.json();
    const colors = poke.types.map(t => typeColors[t.type.name]);

    let boxShadowStyle;
    if (colors.length > 1){
        boxShadowStyle = `
        0 0 25px ${colors[0]},
        0 0 25px ${colors[1]}
        `;
    } else {
        boxShadowStyle = `0 0 35px ${colors[0]}`;
    }


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

    const typeHTML = pokeTypes
    .map(type => `<span class="type ${type}">${type}</span>`)
    .join('');

    wrapper.innerHTML = `
    <div class="pokemon-card">
        <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
        </div>
        <div class="pokemon-info">
            <h2><strong>Pokédex Data</strong></h2>
            <b><strong><em>${genName}</em></strong></b>
            <p><strong>National ID:</strong><em> #${id}</em></p>
            <p><strong>Nome:</strong><em> ${name}</em></p>
            <p><strong>Tipo:</strong> ${typeHTML}</p>
            <p><strong>Altura:</strong></em> ${poke.height / 10} m</em></p>
            <p><strong>Peso:</strong><em> ${poke.weight / 10} kg</em></p>
            <p><strong>Habilidades:</strong><em> ${poke.abilities.map(a => a.ability.name).join(', ')}</em></p>
        </div>
    </div>
    `;
};

fetchPokemon(pokemonId);
