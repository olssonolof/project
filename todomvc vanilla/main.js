const toggleAll = document.querySelector("#toggleall");
const list = document.querySelector("#todoList");

toggleAll.addEventListener("keypress", function(e) {
  let key = e.charCode;
  if (key === 13) {
    let test = toggleAll.value;
    createListItem();
  }
});

const createListItem = () => {
  let node = document.createElement("li");
  let div = document.createElement("div");
  node.appendChild(div);
  let input = document.createElement("input");
  div.appendChild(input);
  let label = document.createElement("label");
  div.appendChild(label);
  label.textContent = toggleAll.value;
  let button = document.createElement("button");
  div.appendChild(button);
  list.appendChild(node);
  console.log("let node" + node);
  console.log("let todolist" + list);
};
