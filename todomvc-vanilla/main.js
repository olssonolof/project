const toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");
const markAll = document.querySelector("#markAll");
const markAllIcon = document.querySelector("#markAll i");

markAllIcon.addEventListener("click", () => {
  selectAllTodo();
});

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

const isChecked = listItem => {
  let checker = listItem.children[0].firstChild;
  let label = listItem.children[1];
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
    markAllIcon;
  } else {
    markAll.hidden = true;
  }
};

const editToDoText = (todo, listitem) => {
  todo.contentEditable = true;
  listitem.classList.add("todo-edit");
};

const deleteToDo = todo => {
  list.removeChild(todo);
  showMarkAll();
};

const selectAllTodo = () => {
  let node = document.querySelectorAll(".listitem-container");
  let allTodo = document.querySelectorAll(".fas.fa-check.hidden");
  if (allTodo.length != 0) {
    node.forEach(x => {
      if (x.firstChild.firstChild.classList.value.includes("hidden")) {
        isChecked(x);
      }
    });
  } else {
    node.forEach(x => {
      isChecked(x);
    });
  }
  showMarkAll();
};

showMarkAll();

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
    if (label.innerText === "") {
      deleteToDo(node);
    } else {
      label.contentEditable = false;
      node.classList.remove("todo-edit");
    }
  });

  node.appendChild(label);

  label.innerText = toggleAll.value;
  toggleAll.value = "";

  let button = document.createElement("button");
  let icon = document.createElement("i");
  icon.classList = "fas fa-times fa-2x";
  icon.addEventListener("click", () => {
    deleteToDo(node);
  });

  button.appendChild(icon);

  div.addEventListener("click", () => {
    isChecked(node);
  });
  node.appendChild(button);
  list.appendChild(node);
};
