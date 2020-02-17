function displayMen(btn) {
    let menBlock = document.getElementById("men");
    let womenBlock = document.getElementById("women");
    btn.classList.add("active");
    btn.parentElement.nextElementSibling.children[0].classList.remove("active");
    menBlock.style.display = "flex";
    womenBlock.style.display = "none";
}

function displayWomen(btn) {
    let menBlock = document.getElementById("men");
    let womenBlock = document.getElementById("women");
    btn.classList.add("active");
    btn.parentElement.previousElementSibling.children[0].classList.remove("active");
    womenBlock.style.display = "flex";
    menBlock.style.display = "none";
}