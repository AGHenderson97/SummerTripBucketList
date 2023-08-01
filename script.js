// Function to add a new bucket list item to the list
function addItem() {
  const input = document.getElementById("new-item");
  const newItemText = input.value.trim();

  if (newItemText !== "") {
    const itemList = document.getElementById("items-list");
    const newItem = document.createElement("li");
    newItem.className = "item"; // Add the "item" class to the new list item
    newItem.innerHTML = `
      <input type="checkbox" class="completed-checkbox">
      <span>${newItemText}</span>
      <button class="delete-button">Delete</button>
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

// Function to handle the change event on the checkbox
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
document.getElementById("items-list").addEventListener("change", handleCheckboxChange);
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-button")) {
    handleDeleteButtonClick(event);
  }
});

// Initialize Firebase
fetch('firebaseConfig.json')
  .then((response) => response.json())
  .then((config) => {
    firebase.initializeApp(config);
    // Now you can use Firebase in your app, e.g., syncing data with Realtime Database

    // Get a reference to the Firebase Realtime Database
    const database = firebase.database();
    const checklistRef = database.ref('checklist');

    // Function to add a new bucket list item to the list
    function addItemToChecklist(itemText) {
      checklistRef.push({
        text: itemText,
        checked: false
      });
    }

    // Function to display the checklist items on the page
    function displayChecklistItems(data) {
      const itemList = document.getElementById("items-list");
      itemList.innerHTML = "";

      data.forEach((itemSnapshot) => {
        const itemKey = itemSnapshot.key;
        const itemData = itemSnapshot.val();

        const listItem = document.createElement("li");
        listItem.className = "item";
        listItem.setAttribute("data-key", itemKey);
        listItem.innerHTML = `
          <input type="checkbox" class="completed-checkbox" ${itemData.checked ? "checked" : ""}>
          <span>${itemData.text}</span>
          <button class="delete-button">Delete</button>
        `;

        // Attach event listener for the Delete button
        listItem.querySelector(".delete-button").addEventListener("click", handleDeleteButtonClick);

        itemList.appendChild(listItem);
      });
    }

    // Function to listen for changes in the checklist data
    function listenForChanges() {
      checklistRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const checklistItems = Object.values(data);
          displayChecklistItems(checklistItems);
        }
      });
    }

    // Call the function to listen for changes in the checklist data
    listenForChanges();
  })
  .catch((error) => {
    console.error('Error loading Firebase config:', error);
  });
