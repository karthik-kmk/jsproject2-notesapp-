let inputtitle = document.querySelector("#inputtitle");
let addbtn = document.querySelector("#addtitle");
let displaytitle = document.querySelector("#displaytitle");
let search = document.querySelector("#searchBox");

let savedData = localStorage.getItem("mydata");
let array = savedData ? JSON.parse(savedData) : [];


function renderItem(item, index) {
  let contentdiv = document.createElement("div");
  contentdiv.classList.add("content-div");


  let input1 = document.createElement("input");
  input1.className = "input1-title";
  input1.type = "text";
  input1.value = item.title.toUpperCase();

  input1.placeholder = "Enter title";


  let input2 = document.createElement("div");
  input2.className = "input2-desc";
  input2.contentEditable = true;
  input2.style.border = "1px solid #ccc";
  input2.style.padding = "5px";
  input2.style.minHeight = "20px";
  input2.style.backgroundColor = "#1e1e1e"; 
  input2.style.color = item.description ? "#fff" : "#aaa"; 


  input2.textContent = item.description || "Enter description";


  input2.addEventListener("focus", function () {
    if (input2.textContent === "Enter description") {
      input2.textContent = "";
      input2.style.color = "rgb(227, 214, 214)";
    }
  });

  input2.addEventListener("blur", function () {
    if (input2.textContent.trim() === "") {
      input2.textContent = "Enter description";
      input2.style.color = "#aaa";
    } else {
      input2.style.color = "rgb(227, 214, 214)"; 
    }
  });


  input2.addEventListener("focus", function () {
    if (input2.textContent === "Enter description") {
      input2.textContent = "";
      input2.style.color = "#000"; 
    }
  });

  input2.addEventListener("blur", function () {
    if (input2.textContent.trim() === "") {
      input2.textContent = "Enter description";
      input2.style.color = "#aaa"; 
    }
  });


  let save = document.createElement("button");
  save.className = "save-btn";
  save.innerHTML = "↓";
  save.style.background = "transparent";
  save.style.color = "white";
  save.style.cursor = "pointer";

  save.addEventListener("click", function () {
    array[index].title = input1.value;
    array[index].description = input2.textContent;
    localStorage.setItem("mydata", JSON.stringify(array));
  });


  let del = document.createElement("button");
  del.className = "delete-btn";
  del.innerHTML = "❌";
  del.addEventListener("click", function () {
    array.splice(index, 1);
    localStorage.setItem("mydata", JSON.stringify(array));
    displaytitle.innerHTML = "";
    array.forEach((item, i) => renderItem(item, i));
  });


  let btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  btnContainer.appendChild(save);
  btnContainer.appendChild(del);


  contentdiv.appendChild(input1);
  contentdiv.appendChild(input2);
  contentdiv.appendChild(btnContainer);

  displaytitle.prepend(contentdiv);
}


array.forEach((item, index) => {
  renderItem(item, index);
});


addbtn.addEventListener("click", function () {
  let newItem = {
    title: inputtitle.value,
    description: "",
  };
  array.push(newItem);
  localStorage.setItem("mydata", JSON.stringify(array));
  renderItem(newItem, array.length - 1);
  inputtitle.value = "";
});


search.addEventListener("input", function () {
  let searchTerm = search.value.toLowerCase();
  let items = document.querySelectorAll(".content-div");

  items.forEach(function (item) {
    let titleInput = item.querySelector(".input1-title");
    let titleText = titleInput ? titleInput.value.toLowerCase() : "";

    item.style.display = titleText.includes(searchTerm) ? "block" : "none";
  });
});
