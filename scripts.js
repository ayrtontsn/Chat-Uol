const name = "João";
let people_send = "Todos";
let target_send = "Público";

let msg_chat = [];
let ul = document.querySelector("ul")

let chat={}


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
    
    today=new Date();
    clock = today.toLocaleTimeString();
   
     
    chat = {
        type: "msg",
        time: clock,
        me: name,
        privacity: target_send,
        to: people_send,
        msg: input
    }

    msg_chat.push(chat)
    document.querySelector("input").value = ""
    rendermsg()

    // const promessa = axios.post('http://...', dados);
    // promessa.then(processarResposta);
}

function in_out(){
    today=new Date();
    clock = today.toLocaleTimeString();
   
     
    chat = {
        type: "in_out",
        time: clock,
        me: name,
        privacity: target_send,
        to: people_send,
        msg: ""
    }
    msg_chat.push(chat)
    rendermsg()
}

function rendermsg(){
    ul.innerHTML = "";
    let msg = ""
    
    for(let i=0;i<msg_chat.length;i++){
        if(msg_chat[i].type === "msg"){
            msg = Message(msg_chat[i])
        }
        else{
            msg = login(msg_chat[i])
        }
        ul.innerHTML += msg
    }
}

function Message(info){
    let msg = ``
    if (info.privacity === "Público"){
        msg = `        
                <li>
                    <h6>
                        <em>(${info.time})</em> <strong>${info.me}</strong> para <strong>${info.to}</strong>: ${info.msg}
                    </h6>
                </li>
                `  
    }
    else{
        msg = `        
        <li class="priv">
            <h6>
                <em>(${info.time})</em> <strong>${info.me}</strong> reservadamente para <strong>${info.to}</strong>: ${info.msg}
            </h6>
        </li>
        `
    }

    return msg
}

function login(info){
    let msg = ``
    if(info==="in"){
        msg = `        
        <li>
            <h6>
                <em>(${info.time})</em> <strong>${info.me}</strong> Entra na sala
            </h6>
        </li>
        `
    }
    else{
        msg = `        
        <li>
            <h6>
                <em>(${info.time})</em> <strong>${info.me}</strong> Entra na sala
            </h6>
        </li>
        `
    }
    console.log("entrou")
    console.log(msg)
    return msg
}




function save(){
    //const dados = {...};
    //const requisicao = axios.post('http://...', dados);
}

in_out()