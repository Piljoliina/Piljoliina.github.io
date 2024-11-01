let input = document.getElementById("Teksti");
let list = document.getElementById("lista");
let minimalValue = 3;
let listNum = 0;

            //Aaron

// Lataa tiedot local storagesta
window.onload = () => {
    loadListFromLocalStorage();
};

// Lisää listaan ja pistä muistiin
addList = () => {
    let inputText = filterList(input.value);
    if (inputText) {

        let listItemHTML = `
            <li class="my-2 py-2 shadow list-group-item" id="lista${listNum}">
                <div class="row">
                    <div class="col-6">
                        <span class="h4" id="text${listNum}"> ${inputText} </span>
                    </div>        
                    <div class="col-4">
                        <button class="btn btn-dark" onclick="deleteList(${listNum})">Delete</button>
                    </div>
                </div>  
            </li>`;
        
        list.innerHTML += listItemHTML;

        saveListToLocalStorage(); 
        input.value = ""; 
        listNum++;
    }
};

// Kirjaimien vähimmäis määrä (Kolme)
filterList = (x) => {
    if (x) {
        if (x.length >= minimalValue) {
            return x;
        } else {
            alert("Enemmäin kuin Kolme kirjainta!");
        }
    } else {
        return false;
    }
};

// Poista VIIMEINEN lista ja lisää tämä muutoksen muistiin
removeLastItem = () => {
    if (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
        listNum = Math.max(0, listNum - 1); 
        saveListToLocalStorage(); 
    } else {
        alert("Ei Ole Poistettavaa!");
    }
};

// Poista tietty lista ja lisää tämän muutoksen muistiin
deleteList = (listId) => {
    let current = document.getElementById(`text${listId}`).innerHTML;
    let deleteConfirm = confirm(`Oletko varma että haluat poistaa -> ${current}`);
    if (deleteConfirm) {
        let item = document.getElementById(`lista${listId}`);
        if (item) {
            list.removeChild(item);
            saveListToLocalStorage();
        }
    }
};

// Tallenna kaikki listan elementit local storageen
saveListToLocalStorage = () => {
    let items = [];
    list.querySelectorAll("li").forEach(item => {
        items.push(item.querySelector("span").innerText.trim());
    });
    localStorage.setItem("todoList", JSON.stringify(items));
};

// Lataa listan local storagesta
loadListFromLocalStorage = () => {
    let items = JSON.parse(localStorage.getItem("todoList"));
    if (items && items.length > 0) {
        items.forEach((itemText, index) => {
            list.innerHTML += `
                <li class="my-2 py-2 shadow list-group-item" id="lista${index}">
                    <div class="row">
                        <div class="col-6">
                            <span class="h4" id="text${index}"> ${itemText} </span>
                        </div>        
                        <div class="col-4">
                            <button class="btn btn-dark" onclick="deleteList(${index})">Delete</button>
                        </div>
                    </div>  
                </li>`;
        });
        listNum = items.length;
    }
};