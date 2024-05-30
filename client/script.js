const http = new coreHTTP;
const url = 'http://localhost:5500/api';
let theList = [];

const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

//Event Listeners
addButton.addEventListener("click", () => httpPost(input.value));
delButton.addEventListener("click", () => httpDelete(input.value));

function ShowList() {
  let output = "<ul>";
  for (var itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
    newList = await http.get(url);
    for(var i = 0; i < newList.length; i++) {
        var item = newList[i];
        theList.push(item);
    }
    ShowList();
}

async function WriteList() {
    await http.post(url, theList);
}

async function httpPost(input) {
    if(input) {
        theList.push(input);
        await WriteList();
        ShowList();
    }
}

function httpDelete(body) {
    const index = theList.indexOf(input.value);
    if (index == -1) {
        alert("Not found.");
    } 
    else {
        theList.splice(index, 1);
        WriteList();
        ShowList();
    }
}

function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();
  await GetList();
  addButton.disabled = false;
  delButton.disabled = false;
}

main();