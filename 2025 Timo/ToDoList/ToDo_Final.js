let input = document.getElementById("Teksti");
let list = document.getElementById("lista");
let minimalValue = 3;
let listNum = 0;

addList = () => {
    let inputText = filterList(input.value);
    if (inputText) {
        list.innerHTML += `<li class="my-2 py-2 shadow list-group-item" id="lista${listNum}">
                <div class="row">
                    <div class="col-6">
                        <span class="h4" id="text${listNum}"> ${inputText} </span>
                    </div>        
                </div>  
                    <div class="col-4">
                    <button class=" btn btn-dark" onclick="deleteList(${listNum})">Delete</button>
                </div>
            </li>`;

        input.value = " ";
        listNum++;
    }
};

filterList=(x)=>{
    
    if (x) {
         if (x.length >= minimalValue) {
             return x;
         }
         else{
             alert("Enemmäin kuin Kolme kirjainta!")
         }
    }
    else{
         return false;
    }

}

// Poista viimeinen Lista 
removeLastItem = () => {

    if (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
        listNum = Math.max(0, listNum - 1);
    } else {
        alert("Ei Ole Poistettavaa!");
    }
};

deleteList=(listId)=>{
    let current = document.getElementById(`text${listId}`).innerHTML;
       let deleteComfirm = confirm(`Oletko varma että haluat poistaa -> ${current}`);
    if (deleteComfirm) {
         let p = document.getElementById("lista")
        let c = document.getElementById(`lista${listId}`);
        p.removeChild(c);
    }
    else{
        console.log("Poistettu");
    }
};

