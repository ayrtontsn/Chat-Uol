let myname = ""
let name = {
    name: myname
}


let people_send = "Todos";
let target_send = "Público";

let msg_chat = [];
let ul = document.querySelector("ul")
let list_persons = document.querySelector(".persons")

let chat={}
let private = "message";

const Todos =`
            <div class="people" onclick="people(this)">
                <div class="name_menu">                
                    <ion-icon class="send" name="people"></ion-icon>
                    <h1>Todos</h1>
                </div>
                <ion-icon class="check select" name="checkmark-sharp"></ion-icon>
            </div>`;


const url = "0ebba881-9e60-4008-a4cb-97ae913eb81a";
const msg_server = "https://mock-api.driven.com.br/api/v6/uol/messages/"+url;
const status_server = "https://mock-api.driven.com.br/api/v6/uol/status/"+url;
const participants_server = "https://mock-api.driven.com.br/api/v6/uol/participants/"+url;


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

    span_input(people_send,target_send)

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

    span_input(people_send,target_send)
}

function span_input(people,target){
    const input = document.querySelector("span")
    input.innerHTML = `Enviando para ${people} (${target})`
}

function send(){
    const input = document.querySelector("input").value

    if(target_send === "Público"){
        private = "message";
    }
    else{
        private = "private_message";
    }
   
    chat = {
        from: myname,
        to: people_send,
        text: input,
        type: private,
    }
    document.querySelector("input").value = "";
    
    const promise = axios.post(msg_server,chat);
    promise.then(msg_request);
}

function join(){
    call_name()
    let promise = axios.post(participants_server,name);
    promise.then(request_continuos);
    promise.catch(error_name);

    
}

function request_continuos(){
    setTimeout(persons_request)
    setTimeout(msg_request)
    
    setInterval(status_request,5000);
    setInterval(persons_request,10000);
    setInterval(msg_request,3000);
}
function call_name(){
    myname = String(prompt("Qual seu nome?"));
    name = {
        name: myname
    }
}

function msg_request(){
    const request_get = axios.get(msg_server);
    request_get.then(rendermsg);
    request_get.catch(error_msg);
}

function status_request(){
    const promise = axios.post(status_server,name);
}

function persons_request(){
    const request_get = axios.get(participants_server);
    request_get.then(show_persons);
}

function error_name(){
    alert("Digite outro nome, pois este já pode estar em uso!")
    join()
}

function error_msg(){
    window.location.reload(true);
}

function rendermsg(msg){

    ul.innerHTML = "";
    msg_chat = msg.data
    
    for(let i=0;i<msg_chat.length;i++){
        msg = Message(msg_chat[i])
        ul.innerHTML += msg;
        ul.scrollIntoView({ block: "end" });
    }
    
}

function Message(info){
    let msg = ``
    if (info.type === "message"){
        msg = `        
                <li>
                    <h6>
                        <em>(${info.time})</em> <strong>${info.from}</strong> para <strong>${info.to}</strong>: ${info.text}
                    </h6>
                </li>
                `  
    }
    else if(info.type==="status"){
        msg = `        
        <li class="login">
            <h6>
                <em>(${info.time})</em> <strong>${info.from}</strong> ${info.text}
            </h6>
        </li>
        `
    }
    else{
        if(info.to === myname || info.from === myname || info.to === "Todos"){
            msg = `        
            <li class="priv">
                <h6>
                    <em>(${info.time})</em> <strong>${info.from}</strong> reservadamente para <strong>${info.to}</strong>: ${info.text}
                </h6>
            </li>
            `
        }
    }
    return msg
}






function show_persons(persons){
    list_persons.innerHTML = Todos

    let persons_in = persons.data

    if(!persons_in){
        persons_in = ""
    }
    
    for(let i=0;i<persons_in.length;i++){
        
        show_people =
        `   <div class="people" onclick="people(this)">
                <div class="name_menu">                
                    <ion-icon class="send" name="person-circle"></ion-icon>
                    <h1>${persons_in[i].name}</h1>
                </div>
                <ion-icon class="check hidden" name="checkmark-sharp"></ion-icon>
            </div>`
        if(persons_in[i].name !== myname){
            list_persons.innerHTML += show_people;
        }
    }    
}

join()
request_continuos()