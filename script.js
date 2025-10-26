const totalPokemons = 809;

function getRandomPokemonId() {
    return Math.floor(Math.random() * totalPokemons) + 1;
}

function loadRandomPokemons() {
    const ids = [];
    while (ids.length < 3) {
        const id = getRandomPokemonId();
        if (!ids.includes(id)) ids.push(id);
    }

    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`id${i}`);
        const link = img.parentElement;
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ids[i-1]}.png`;
        link.href = `page.html?id=${ids[i-1]}`;
    }
}

window.onload = loadRandomPokemons;

const selectBtn = document.querySelector(".select-btn");
const typeItems = document.querySelectorAll(".item");
const btnText = document.querySelector(".btn-text");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");

});

typeItems.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const checked = document.querySelectorAll(".item.checked");
        btnText.innerText = checked.length > 0 ? `${checked.length} Selecionado(s)` : "Selecionar tipo V";
    });
});

const selector = document.querySelector(".selector");
const genItems = document.querySelectorAll(".iten");
const btbText = document.querySelector(".btb-text");

selector.addEventListener("click", () => {
    selector.classList.toggle("open");
});

genItems.forEach(iten => {
    iten.addEventListener("click", () => {
        iten.classList.toggle("checked");
        const checked = document.querySelectorAll(".iten.checked");
        btbText.innerText = checked.length > 0 ? `${checked.length} Selecionados` : "Selecionar geração V";
    });
});

const form = document.querySelector('form');
const input = document.querySelector('#pokemon-name');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchValue = input.value.trim().toLowerCase();

    const selectedTypes = Array.from(document.querySelectorAll('.item.checked'))
        .map(item => item.querySelector('.item-text').textContent.toLowerCase());

    const selectedGens = Array.from(document.querySelectorAll('.iten.checked'))
        .map(item => item.querySelector('.iten-text')?.textContent.match(/\d+/)?.[0])
        .filter(Boolean);


    if (searchValue) {
        try {
            const url = isNaN(searchValue)
                ? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
                : `https://pokeapi.co/api/v2/pokemon/${Number(searchValue)}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Pokémon não encontrado');

            const data = await response.json();

            window.location.href = `page.html?id=${data.id}`;
            return;
        } catch (err) {
            alert('Pokémon não encontrado. Tente novamente!');
            return;
        }
    }

    if (selectedTypes.length > 0 || selectedGens.length > 0) {
        const query = new URLSearchParams();
        if (selectedTypes.length > 0) query.append('type', selectedTypes.join(','));
        if (selectedGens.length > 0) query.append('gen', selectedGens.join(','));

        window.location.href = `resultado.html?${query.toString()}`;
        return;
    }

    alert('Digite o nome/número ou selecione tipo/geração para pesquisar.');
});


