let listUl = document.querySelector('.list');
const inputText = document.getElementById('todo');
const formSubmit = document.getElementById('todoForm');
const liArray = document.getElementsByTagName('li');

//Add todos
formSubmit.addEventListener('submit', (e, editText) => {
  e.preventDefault();

  //Check for empty field.
  if(inputText.value.trim() === ""){
    return;
  }

  //Create li
  let itemLi = document.createElement("li");
  itemLi.className = "list-item";

  //Create div
  let itemDiv = document.createElement("div");
  itemDiv.className = "priority";

  
  //Create textSpan
  let textSpan = document.createElement("span");
  textSpan.className = "text";
  textSpan.innerHTML = inputText.value;
  //Append textSpan to item
  itemLi.appendChild(textSpan)


  //Create deleteBtn
  let deleteSpan = document.createElement("button");
  deleteSpan.className = "delete";
  deleteSpan.innerHTML = "&times;";
  //Append deleteSpan to item
  itemLi.appendChild(deleteSpan)
  
  
  //Create lowSpan
  let lowSpan = document.createElement("span");
  lowSpan.classList = "btn LowBtn";
  lowSpan.innerHTML = "Low";
  lowSpan.setAttribute("data-active", "1")
  //Append lowSpan to item
  itemDiv.appendChild(lowSpan);
  

  //Create midSpan
  let midSpan = document.createElement("span");
  midSpan.classList = "btn disabled";
  midSpan.innerHTML = "Mid";
  midSpan.setAttribute("data-active", "0")
  //Append midSpan to item
  itemDiv.appendChild(midSpan);

  //Create highSpan
  let highSpan = document.createElement("span");
  highSpan.classList = "btn disabled";
  highSpan.innerHTML = "High";
  highSpan.setAttribute("data-active", "0")
  //Append highSpan to item
  itemDiv.appendChild(highSpan);

  //Attach itemDiv to itemLi
  itemLi.appendChild(itemDiv);

  //Attach Btn event listeners
  lowSpan.onclick = setPriorityHandler;
  midSpan.onclick = setPriorityHandler;
  highSpan.onclick = setPriorityHandler;
  deleteSpan.onclick = deleteLiHandler;
  itemLi.ondblclick = editHandler;

  //Check if itemLi already exists inside liArray
  for (let li of liArray) {
    if (li.firstElementChild.innerText.toLowerCase()
      ===
      itemLi.firstElementChild.innerText.toLowerCase()
    ) {
      alert("Item already exists!");
      return;
    }
  }

  //Append itemLi to listUl
  listUl.appendChild(itemLi)
  inputText.value = "";
});

//deleteLiHandler
function deleteLiHandler(e) {
  const deleteLi = e.target.parentElement;
  deleteLi.parentElement.removeChild(deleteLi);
}

//setPriorityHandler
function setPriorityHandler(e) {
  const btnClicked = e.target;
  const btnText = btnClicked.innerText;
  const priorityList = btnClicked.parentElement.children;

  if(btnClicked.attributes[1].value === "1"){
    return;
  }else{
    btnClicked.dataset.active = "1";
    btnClicked.classList = `btn ${btnText}Btn` ;
  }
  
  //Deactivate other priority buttons.
  for(let span of priorityList){
    if(span.textContent !== btnClicked.textContent){
      span.dataset.active = "0";
      span.classList = "btn disabled";
    }
  }
}

function editHandler(e){
  const btnClicked = e.target;
  const btnText = btnClicked.innerText;
  inputText.value = btnText;
}