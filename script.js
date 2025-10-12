
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

