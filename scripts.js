const myname = "João";
let people_send = "Todos";
let target_send = "Público";

let msg_chat = [];
let ul = document.querySelector("ul")
let list_persons = document.querySelector(".persons")

let chat={}

let persons_in=[]

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
    
    today=new Date();
    clock = today.toLocaleTimeString();
   
     
    chat = {
        from: myname,
        to: people_send,
        text: input,
        type: "message",
    }

    msg_chat.push(chat)
    document.querySelector("input").value = "";

    console.log(chat)
    
    const promise = axios.post(msg_server,chat);

    promise.then(teste);
}
function teste (){
    const request_get = axios.get(msg_server);
    request_get.then(rendermsg);
}

function join(){
    today=new Date();
    clock = today.toLocaleTimeString();
   
     
    /* chat = {
        from: myname,
        text: "entra na sala...",
        time: clock,
        to: people_send,
        type: "status"
    } */

    const name = {
        name: myname
    }


    // msg_chat.push(chat)

    const promise = axios.post(participants_server,name);
    promise.then(teste);
}

function rendermsg(msg){

    console.log("Mensagem enviada")
    ul.innerHTML = "";
    // let msg = ""
    // const promise = axios.get(msg_server)
    // promise.then(process_msg)

    msg_chat = msg.data

    console.log(msg)
    console.log(msg_chat)
    
    for(let i=0;i<msg_chat.length;i++){
        msg = Message(msg_chat[i])
        ul.innerHTML += msg
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

function login(){

}

function save(){
    //const dados = {...};
    //const requisicao = axios.post('http://...', dados);
}

function checkin(people){
    if(people.type === "status"){
        return true
    }
}

function persons(){
    // Fazer o filtro mostrando todas as pessoas que entraram e saíram
    const persons_in_out = msg_chat.filter(checkin);
    persons_in=[]

    for(let i=0;i<persons_in_out.length;i++){
        let count_login=0
        
        
        for(let a=0;a<persons_in_out.length;a++){
            if(persons_in_out[i].me === persons_in_out[a].me)
                count_login++
        }
        if(count_login%2===1){
            persons_in.push(persons_in_out[i].me)
        }      
    }
    return persons_in
    
    // Fazer um while passando por essa lista, mostrnado quantas vezes passou pelo nome

    // Se par - não listar --- Se impar - Listar
}

function show_persons(){
    persons_in = persons()
    let msg = ""

    let show_people = "";
    
    for(let i=0;i<persons_in.length;i++){
        msg =
        `   <div class="people" onclick="people(this)">
                <div class="name_menu">                
                    <ion-icon class="send" name="person-circle"></ion-icon>
                    <h1>${persons_in[i]}</h1>
                </div>
                <ion-icon class="check hidden" name="checkmark-sharp"></ion-icon>
            </div>`;
    }

    list_persons.innerHTML += msg
}

join()
show_persons()

//while(true){
//    setTimeout(process_request,5000);
//}