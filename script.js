
const selectBtn = document.querySelector(".select-btn");
const typeItems = document.querySelectorAll(".item");
const btnText = document.querySelector(".btn-text");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

typeItems.forEach(item => {
    item.addEventListener("click", () => {
        const checked = document.querySelectorAll(".item.checked");

        if (!item.classList.contains("checked") && checked.length >= 2) {
            alert("Você só pode selecionar até 2 tipos.");
            return;
        }


        item.classList.toggle("checked");

        const newChecked = document.querySelectorAll(".item.checked");
        btnText.innerText = newChecked.length > 0 ? `${newChecked.length} Selecionado(s)` : "Selecionar tipo V";
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
        const checked = document.querySelectorAll(".iten.checked");

        if (!iten.classList.contains("checked") && checked.length >= 2) {
            alert("Você só pode selecionar até 2 gerações.");
            return;
        }

        iten.classList.toggle("checked");

        const newChecked = document.querySelectorAll(".iten.checked");
        btbText.innerText = newChecked.length > 0 ? `${newChecked.length} Selecionado(s)` : "Selecionar geração V";
    });
});

