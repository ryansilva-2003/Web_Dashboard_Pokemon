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

