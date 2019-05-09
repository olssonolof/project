const toggleAll = document.querySelector("#toggleall");
toggleAll.addEventListener("keypress", function(e) {
  let key = e.charCode;
  if (key === 13) {
    createListItem();
  }
});

const createListItem = () => {};
