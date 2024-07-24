function show_menu(){
    const menu = document.querySelector(".menu");
    const mask = document.querySelector(".mask");

    menu.classList.remove("hidden")
    mask.classList.remove("hidden")
}

function hidden_menu(){
    const menu = document.querySelector(".menu");
    const mask = document.querySelector(".mask");

    menu.classList.add("hidden")
    mask.classList.add("hidden")
}