class todoSaveClass {
  constructor(done, todoText) {
    this.done = done;
    this.todoText = todoText;
  }
}

let toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");
const markAll = document.querySelector("#markAll");
const markAllIcon = document.querySelector("#markAll i");
const footer = document.querySelector("#footer");
const section = document.querySelector("#section");
let todoList = [];

document
  .querySelector("#footer-clear")
  .firstChild.addEventListener("click", () => {
    clearCompleted();
  });

document.querySelector("#footer-active").addEventListener("click", () => {
  showActive();
});

document.querySelector("#footer-all").addEventListener("click", () => {
  showAllTodo();
});

document.querySelector("#footer-completed").addEventListener("click", () => {
  showCompleted();
});

section.removeChild(footer);

window.addEventListener("hashchange", () => {
  urlChange();
});

window.addEventListener("beforeunload", () => {
  saveTodo();
});

window.addEventListener("load", () => {
  loadTodo();
});

markAllIcon.addEventListener("click", () => {
  selectAllTodo();
});

toggleAll.addEventListener("focusout", () => {
  if (toggleAll.value.length != 0) {
    createListItem();
    showMarkAll();
  }
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

const editToDoText = todo => {
  todo.contentEditable = true;
  todo.addEventListener("keypress", e => {
    key = e.charCode;
    if (key === 13) {
      todo.blur();
    }
  });
  todo.classList.add("todo-edit");
  let button = todo.parentElement.lastChild;
  button.classList.add("z-index");
};

const deleteToDo = todo => {
  if (list.contains(todo)) {
    list.removeChild(todo);
    showMarkAll();
  }
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
  urlChange();
};

const createListItem = (done = false) => {
  let node = document.createElement("li");

  node.classList = "listitem-container";

  let div = document.createElement("div");
  node.appendChild(div);

  let checker = document.createElement("i");
  checker.classList = "fas fa-check";
  div.appendChild(checker);

  let label = document.createElement("label");
  if (!done) {
    checker.classList.add("hidden");
  } else label.classList.add("listitemchecked");
  if (window.matchMedia("(min-width: 690px)").matches) {
    label.addEventListener("dblclick", () => {
      editToDoText(label);
    });
  } else {
    label.addEventListener("click", () => {
      editToDoText(label);
    });
  }
  label.id = "todo-label";

  label.addEventListener("focusout", () => {
    todoEditDone(node);
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

  showMarkAll();
  urlChange();
};

const todoEditDone = node => {
  let label = node.children[1];
  let button = node.children[2];
  if (label.innerText === "") {
    deleteToDo(node);
  } else {
    label.contentEditable = false;
    label.classList.remove("todo-edit");
  }
  button.classList.remove("z-index");
};

const clearCompleted = () => {
  let doneTodo = document.querySelectorAll(".fas.fa-check:not(.hidden)");
  doneTodo.forEach(x => {
    x.closest("ul").removeChild(x.closest("li"));
  });
  showMarkAll();
};

const showActive = () => {
  let todoNotDone = document.querySelectorAll(".fas.fa-check.hidden");
  let allTodo = document.querySelectorAll(".listitem-container");
  allTodo.forEach(x => x.classList.add("display-none"));
  todoNotDone.forEach(x => x.closest("li").classList.remove("display-none"));
  document.querySelector("#footer-completed a").classList.remove("outline");
  document.querySelector("#footer-active a").classList.add("outline");
  document.querySelector("#footer-all a").classList.remove("outline");
};

const showAllTodo = () => {
  let allTodo = document.querySelectorAll(".listitem-container");
  allTodo.forEach(x => x.classList.remove("display-none"));
  if (document.querySelector("#section").contains(footer)) {
    document.querySelector("#footer-completed a").classList.remove("outline");
    document.querySelector("#footer-active a").classList.remove("outline");
    document.querySelector("#footer-all a").classList.add("outline");
  }
};

const showCompleted = () => {
  let allTodo = document.querySelectorAll(".listitem-container");
  let todoDone = document.querySelectorAll(".fas.fa-check:not(.hidden)");
  allTodo.forEach(x => x.classList.add("display-none"));
  todoDone.forEach(x => x.closest("li").classList.remove("display-none"));
  document.querySelector("#footer-completed a").classList.add("outline");
  document.querySelector("#footer-active a").classList.remove("outline");
  document.querySelector("#footer-all a").classList.remove("outline");
};

const urlChange = () => {
  if (location.hash === "#/active") {
    showActive();
  } else if (location.hash === "#/completed") {
    showCompleted();
  } else {
    showAllTodo();
  }
};

const saveTodo = () => {
  todoList = [];
  let allTodo = document.querySelectorAll(".listitem-container");
  allTodo.forEach(x => {
    let done = false;
    if (!x.firstChild.firstChild.classList.contains("hidden")) {
      done = true;
    }
    let z = new todoSaveClass(done, x.children[1].innerText);
    todoList.push(z);
  });
  localStorage.clear("list");
  localStorage.setItem("list", JSON.stringify(todoList));
};

const loadTodo = () => {
  let loadedContent = localStorage.getItem("list");
  if (loadedContent !== null) {
    todoList = JSON.parse(loadedContent);
    localStorage.clear("list");
    todoList.forEach(x => {
      toggleAll.value = x.todoText;
      done = x.done;
      createListItem(done);
    });
  }
  showMarkAll();
  urlChange();
};
