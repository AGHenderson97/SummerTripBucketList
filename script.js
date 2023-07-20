// Function to add a new bucket list item to the list
function addItem() {
    const input = document.getElementById("new-item");
    const newItemText = input.value.trim();
  
    if (newItemText !== "") {
      const itemList = document.getElementById("items-list");
      const newItem = document.createElement("li");
      newItem.innerHTML = `
      <label class="item">
      <input type="checkbox" class="completed-checkbox">
      <span>${newItemText}</span>
      <button class="delete-button">Delete</button>
    </label>
  `;
  itemList.appendChild(newItem);

  input.value = "";
}
}
  
  // Function to handle the click event on the Add button
  function handleAddButtonClick() {
    addItem();
  }
  
  // Function to handle the Enter key press in the input field
  function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }
  
  // Function to handle the click event on the Delete button
  function handleDeleteButtonClick(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
  }
  
  function handleCheckboxChange(event) {
    const checkbox = event.target;
    const listItem = checkbox.closest("li");
  
    if (checkbox.checked) {
      // If checkbox is checked, add a class to the parent li for styling
      listItem.classList.add("completed");
    } else {
      // If checkbox is unchecked, remove the class
      listItem.classList.remove("completed");
    }
  }
  

  // Add event listeners
  document.getElementById("add-button").addEventListener("click", handleAddButtonClick);
  document.getElementById("new-item").addEventListener("keypress", handleEnterKeyPress);
  document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("delete-button")) {
      handleDeleteButtonClick(event);
    }
  });
  