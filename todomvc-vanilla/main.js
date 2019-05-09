const toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");
const markAll = document.querySelector("#markAll");

toggleAll.addEventListener("keypress", function(e) {
  let key = e.charCode;
  if (key === 13) {
    let test = toggleAll.value;
    createListItem();
    showMarkAll();
  }
});

const createListItem = () => {
  let node = document.createElement("li");

  node.classList = "listitem-container";

  let input = document.createElement("input");
  input.type = "checkbox";
  node.appendChild(input);

  let label = document.createElement("label");
  node.appendChild(label);
  label.innerText = toggleAll.value;
  toggleAll.value = "";

  let button = document.createElement("button");
  button.innerText = "x";

  input.addEventListener("click", () => {
    isChecked(input.checked, label);
  });
  node.appendChild(button);
  list.appendChild(node);
};

const isChecked = (value, label) => {
  if (value === true) {
    label.classList = "listitemchecked";
  } else {
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
showMarkAll();
