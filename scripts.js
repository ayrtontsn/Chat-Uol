const name = "João";
let people_send = "Todos";
let target_send = "Público";




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

function visibility(click){

    const clicked = click.childNodes[3];
    target_send = click.childNodes[1];
    target_send = target_send.childNodes[3].innerHTML
    const before = document.querySelector(".visibility .select")
    
    before.classList.remove("select")
    before.classList.add("hidden")

    clicked.classList.remove("hidden")
    clicked.classList.add("select")
}

function people(click){

    const clicked = click.childNodes[3];
    people_send = click.childNodes[1];
    people_send = people_send.childNodes[3].innerHTML
    const before = document.querySelector(".people .select")
    
    before.classList.remove("select")
    before.classList.add("hidden")

    clicked.classList.remove("hidden")
    clicked.classList.add("select")
}

function send(){
    const input = document.querySelector("input").value
    const ul = document.querySelector("ul")

    if (target_send === "Público"){
        ul.innerHTML += `        
                <li>
                    <h6>
                        <em>(12:12:12)</em> <strong>${name}</strong> para <strong>${people_send}</strong>: ${input}
                    </h6>
                </li>
                `  
    }
    else{
        ul.innerHTML += `        
        <li class="priv">
            <h6>
                <em>(12:12:12)</em> <strong>${name}</strong> reservadamente para <strong>${people_send}</strong>: ${input}
            </h6>
        </li>
        `  
    }
    document.querySelector("input").value = ""
}