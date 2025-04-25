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
