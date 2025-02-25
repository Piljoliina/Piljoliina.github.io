let input = document.getElementById("Teksti");
        let list= document.getElementById("lista");
        let minimalValue = 3;
        let listNum = 0;
addList=()=>{
    let inputText = filterList(input.value);
   if (inputText) {
    list.innerHTML += ` <li class=" my-2 py-2 shadow list-group-item " id="lista${listNum}">

                <div class="row">
                <div class="col-6">
                    <span class=" h4" id="text${listNum}"> ${inputText} </span>
                </div>        
                 </div>  
                </li> `;

        input.value=" ";
        listNum++;

   }
}


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



