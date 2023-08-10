// Keep track of added users and tasks
const usersList = [];
const tasksList = [];
const chatMessages = [];
 
function openModal(message) {
    const modal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    modal.style.display = "block";
}
 
function closeModal() {
    const modal = document.getElementById("successModal");
    modal.style.display = "none";
}
 
function addUser() {
    const userInput = document.getElementById("userInput").value;
    const roleInput = document.getElementById("roleInput").value;
    const genderInputs = document.getElementsByName("gender");
    let selectedGender = "";
    for (const genderInput of genderInputs) {
        if (genderInput.checked) {
            selectedGender = genderInput.value;
            break;
        }
    }
 
    if (userInput.trim() === "" || roleInput.trim() === "" || selectedGender === "") {
        alert("Please enter a valid username, role, and select a gender.");
        return;
    }
 
    // Create a user object
    const user = {
        name: userInput,
        role: roleInput,
        gender: selectedGender,
    };
 
    // Add the user to the list
    usersList.push(user);
 
    // Display the list of all users
    const userListDiv = document.getElementById("users");
    userListDiv.innerHTML = "";
    for (const user of usersList) {
        const userCard = document.createElement("div");
        userCard.className = "user-card";
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Role: ${user.role}</p>
            <p>Gender: ${user.gender}</p>
        `;
        userListDiv.appendChild(userCard);
    }
 
    // Clear the input fields
    document.getElementById("userInput").value = "";
    document.getElementById("roleInput").value = "";
    for (const genderInput of genderInputs) {
        genderInput.checked = false;
    }
 
    // Show a modal with the success message
    openModal(`${user.name} added successfully...`);
 
    // Show a modal with the success message
    openModal(`${user.name} added successfully...`);
 
    // Populate the user select dropdown in the chat section
    populateUserNameSelect();
    populateUserSelect();
 
}
 
function sendMessage() {
    const chatInput = document.getElementById("chatInput").value;
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML += `<div>${chatInput}</div>`;
    document.getElementById("chatInput").value = "";
}
 
function assignTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskSection = document.getElementById("tasks");
    taskSection.innerHTML += `<div>${taskInput}</div>`;
    document.getElementById("taskInput").value = "";
}
 
 
 
// Function to populate the user select dropdown in the chat section
function populateUserNameSelect() {
    const userNameSelect = document.getElementById("userNameSelect");
    userNameSelect.innerHTML = ""; // Clear existing options
    for (const user of usersList) {
        const option = document.createElement("option");
        option.value = user.name;
        option.textContent = user.name;
        userNameSelect.appendChild(option);
    }
}
 
// Function to populate the "Assign to User" dropdown in the task assignment section
function populateUserSelect() {
    const userSelect = document.getElementById("userSelect");
    userSelect.innerHTML = ""; // Clear existing options
    for (const user of usersList) {
        const option = document.createElement("option");
        option.value = user.name;
        option.textContent = user.name;
        userSelect.appendChild(option);
    }
}
 
// Function to add a task and update the task list table
function assignTask() {
    const taskInput = document.getElementById("taskInput").value;
    const userSelect = document.getElementById("userSelect");
    const selectedUserName = userSelect.value;
 
    if (taskInput.trim() === "" || selectedUserName === "") {
        alert("Please enter a valid task name and select a user to assign the task.");
        return;
    }
 
    // Create a task object
    const task = {
        name: taskInput,
        assignedTo: selectedUserName,
    };
 
    // Add the task to the list
    tasksList.push(task);
 
    // Update the task list table
    updateTaskListTable();
 
    // Clear the input fields
    document.getElementById("taskInput").value = "";
    userSelect.selectedIndex = 0;
 
    // Show a modal with the success message
    openModal(`Task "${task.name}" assigned to ${task.assignedTo} successfully...`);
}
 
// Function to update the task list table
function updateTaskListTable() {
    const taskTable = document.getElementById("taskTable");
    taskTable.innerHTML = `
        <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
        </tr>
    `;
    for (const task of tasksList) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.assignedTo}</td>
        `;
        taskTable.appendChild(row);
    }
}
 
function populateUserNameSelect() {
    const userNameSelect = document.getElementById("userNameSelect");
    userNameSelect.innerHTML = ""; // Clear existing options
    for (const user of usersList) {
        const option = document.createElement("option");
        option.value = user.name;
        option.textContent = user.name;
        userNameSelect.appendChild(option);
    }
}
 
// Function to add a chat message
function sendMessage() {
    const chatInput = document.getElementById("chatInput").value;
    const selectedUserName = document.getElementById("userNameSelect").value;
    const currentDate = new Date();
 
    if (chatInput.trim() === "" || selectedUserName === "") {
        alert("Please enter a valid message and select a user.");
        return;
    }
 
    // Create a chat message object
    const chatMessage = {
        userName: selectedUserName,
        message: chatInput,
        timestamp: currentDate.toLocaleString(),
    };
 
    // Add the message to the list of chat messages
    chatMessages.push(chatMessage);
 
    // Update the chat messages section
    updateChatMessages();
 
    // Clear the input field
    document.getElementById("chatInput").value = "";
}
 
// Function to update the chat messages section
function updateChatMessages() {
    const chatMessagesDiv = document.getElementById("chatMessages");
    chatMessagesDiv.innerHTML = ""; // Clear existing messages
    for (const message of chatMessages) {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<p><strong>${message.userName}</strong> (${message.timestamp}): ${message.message}</p>`;
        chatMessagesDiv.appendChild(messageDiv);
    }
}