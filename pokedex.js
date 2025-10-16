const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 649;

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
    dragon: '#97b3e6',
    psychic: '#ed63a2',
    flying: '#B0E0E6',
    fighting: '#A52A2A',
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
    card.addEventListener('click', () => {
        window.location.href = `page.html?id=${poke.id}`;
    })

    const rawName = poke.name.split("-")[0];
    const name = rawName[0].toUpperCase() + rawName.slice(1);
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
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
};

fetchPokemons();
