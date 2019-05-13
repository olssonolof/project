const toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");
const markAll = document.querySelector("#markAll");
const markAllIcon = document.querySelector("#markAll i");
const footer = document.querySelector("#footer");
const section = document.querySelector("#section");
section.removeChild(footer);

markAllIcon.addEventListener("click", () => {
  selectAllTodo();
});

toggleAll.addEventListener("keypress", function(e) {
  let key = e.charCode;
  if (toggleAll.value.length != 0) {
    if (key === 13) {
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
  showMarkAll();
};

const showMarkAll = () => {
  let allTodoDone = document.querySelectorAll(".fas.fa-check:not(.hidden)");
  let allTodo = document.querySelectorAll(".listitem-container");
  if (allTodo.length > 0) {
    if (!section.contains(footer)) {
      section.appendChild(footer);
    }
  }
  let counterElement = document.querySelector("#footer-counter");
  let clearCompleted = document.querySelector("#footer-clear");

  if (allTodo.length - allTodoDone.length === 1) {
    counterElement.innerText = "1 item left";
  } else {
    if (counterElement !== null) {
      counterElement.innerText = `${allTodo.length -
        allTodoDone.length} items left`;
    }
  }

  if (allTodo.length > 0) {
    if (allTodoDone.length > 0) {
      clearCompleted.classList.remove("hidden");
    } else {
      clearCompleted.classList.add("hidden");
    }
    markAll.hidden = false;
    markAllIcon;
    if (allTodoDone.length === allTodo.length) {
      markAllIcon.classList.add("dark-arrow");
    } else {
      markAllIcon.classList.remove("dark-arrow");
    }
  } else {
    if (section.contains(footer)) {
      section.removeChild(footer);
    }
    markAll.hidden = true;
    if (clearCompleted !== null) {
      clearCompleted.classList.remove("hidden");
    }
  }
};

const editToDoText = (todo, listitem) => {
  todo.contentEditable = true;
  todo.classList.add("todo-edit");
  let button = todo.parentElement.lastChild;
  button.classList.add("z-index");
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
  label.id = "todo-label";

  label.addEventListener("focusout", () => {
    if (label.innerText === "") {
      deleteToDo(node);
    } else {
      label.contentEditable = false;
      node.classList.remove("todo-edit");
    }
    button.classList.remove("z-index");
  });

  node.appendChild(label);

  label.innerText = toggleAll.value;
  toggleAll.value = "";

  let button = document.createElement("button");
  button.id = "deleteButton";
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
