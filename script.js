// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';  // Clear the list before re-rendering
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("p-3", "bg-gray-200", "dark:bg-gray-800", "rounded-lg", "shadow-md");
    li.textContent = task;
    taskList.appendChild(li);
  });
}


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");

  const task = taskInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;

  if (task && date && time) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, date: date, time: time });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    loadTasks();
  } else {
    alert("Please fill task, date, and time.");
  }
}
// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';  // Clear the list before re-rendering
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("p-3", "bg-gray-200", "dark:bg-gray-800", "rounded-lg", "shadow-md");

    const taskTime = new Date(task.timestamp); // Extract timestamp
    const formattedTime = taskTime.toLocaleString(); // Format date and time

    // Display task name and date/time
    li.innerHTML = `<span class="font-semibold">${task.text}</span><br><span class="text-sm text-gray-500">${formattedTime}</span>`;
    taskList.appendChild(li);
  });
}

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const timestamp = Date.now(); // Get current timestamp
    tasks.push({ text: task, timestamp: timestamp });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";  // Clear input field
    loadTasks();  // Reload tasks
  }
}

// Function to clear all tasks
function clearTasks() {
  localStorage.removeItem("tasks");
  loadTasks();  // Reload tasks
}

// Function to toggle light/dark mode
function toggleTheme() {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('themeIcon');
  if (document.body.classList.contains('dark')) {
    icon.textContent = '🌙';  // Dark mode icon
  } else {
    icon.textContent = '☀️';  // Light mode icon
  }
}

// Load tasks when the page loads
window.onload = loadTasks;
// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";  // Clear input field
    loadTasks();  // Reload tasks
  }
}

// Function to clear all tasks
function clearTasks() {
  localStorage.removeItem("tasks");
  loadTasks();  // Reload tasks
}

// Function to toggle light/dark mode
function toggleTheme() {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('themeIcon');
  if (document.body.classList.contains('dark')) {
    icon.textContent = '🌙';  // Dark mode icon
  } else {
    icon.textContent = '☀️';  // Light mode icon
  }
}

// Load tasks when the page loads
window.onload = loadTasks;
