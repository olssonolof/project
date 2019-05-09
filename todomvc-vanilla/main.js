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
  input.hidden = true;
  label.innerText = toggleAll.value;
  input.value = toggleAll.value;
  toggleAll.value = "";
  let button = document.createElement("button");
  div.appendChild(button);
  list.appendChild(node);
  node.addEventListener("dblclick", () => {
    label.hidden = true;
    input.hidden = false;
  });
};
