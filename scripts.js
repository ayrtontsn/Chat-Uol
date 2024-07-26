const name = "João";
let people_send = "Todos";
let target_send = "Público";

let msg_chat = [];
let ul = document.querySelector("ul")
let list_persons = document.querySelector(".persons")

let chat={}

let persons_in=[]


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

function join(){
    today=new Date();
    clock = today.toLocaleTimeString();
   
     
    chat = {
        type: "in",
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
    if(info.type==="in"){
        msg = `        
        <li class="login">
            <h6>
                <em>(${info.time})</em> <strong>${info.me}</strong> entra na sala
            </h6>
        </li>
        `
    }
    else{
        msg = `        
        <li class="login">
            <h6>
                <em>(${info.time})</em> <strong>${info.me}</strong> sai da sala
            </h6>
        </li>
        `
    }
    return msg
}

function save(){
    //const dados = {...};
    //const requisicao = axios.post('http://...', dados);
}

function checkin(people){
    if(people.type === "in" || people.type === "out"){
        return true
    }
}

function persons(){
    // Fazer o filtro mostrando todas as pessoas que entraram e saíram
    const persons_in_out = msg_chat.filter(checkin);
    persons_in=["Todos"]

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