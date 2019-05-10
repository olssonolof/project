const toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");
const markAll = document.querySelector("#markAll");

toggleAll.addEventListener("keypress", function(e) {
  let key = e.charCode;
  if (toggleAll.value.length != 0) {
    if (key === 13) {
      let test = toggleAll.value;
      createListItem();
      showMarkAll();
    }
  }
});

const createListItem = () => {
  let node = document.createElement("li");

  node.classList = "listitem-container";

  let div = document.createElement("div");
  node.appendChild(div);

  let checker = document.createElement("i");
  checker.classList = "fas fa-check";
  checker.classList.add("hidden");
  div.appendChild(checker);

  let label = document.createElement("label");
  label.addEventListener("dblclick", () => {
    editToDoText(label, node);
  });
  label.type = "submit";

  label.addEventListener("focusout", () => {
    label.contentEditable = false;
    node.classList.remove("todo-edit");
  });

  node.appendChild(label);

  label.innerText = toggleAll.value;
  toggleAll.value = "";

  let button = document.createElement("button");
  button.innerText = "x";

  div.addEventListener("click", () => {
    isChecked(checker, label);
  });
  node.appendChild(button);
  list.appendChild(node);
};

const isChecked = (checker, label) => {
  if (checker.classList.value.includes("hidden")) {
    label.classList = "listitemchecked";
    checker.classList.remove("hidden");
  } else {
    checker.classList.add("hidden");
    label.classList.remove("listitemchecked");
  }
};

const showMarkAll = () => {
  if (list.childElementCount > 0) {
    markAll.hidden = false;
  } else {
    markAll.hidden = true;
  }
};

const editToDoText = (todo, listitem) => {
  todo.contentEditable = true;
  listitem.classList.add("todo-edit");
};

showMarkAll();
