const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 658;

const colors = {
    fire: '#F08080',
    grass: '#2E8B57',
    ghots: '#9932CC',
    electric: '#FFD700',
    water: '#6495ED',
    ground: '#DEB887',
    rock: '#d5d5d4',
    fairy: '#FF69B4',
    poison: '#BA55D3',
    bug: '#9ACD32',
    dragon: '#97b3e6',
    psychic: '#EE82EE',
    flying: '#B0E0E6',
    fighting: '#E6E0D4',
    normal: '#DCDCDC'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="pkdContainer">
            <img width="85" height="85" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
        </div>

        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
};

fetchPokemons();
