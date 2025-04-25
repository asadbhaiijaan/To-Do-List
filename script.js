// === Firebase Setup ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// === Your Config ===
const firebaseConfig = {
  apiKey: "AIzaSyCG48IFs2apvNkyFC_VrZhFAdWhwf9D12A",
  authDomain: "to-do-list-9a2f4.firebaseapp.com",
  projectId: "to-do-list-9a2f4",
  storageBucket: "to-do-list-9a2f4.firebasestorage.app",
  messagingSenderId: "906519457342",
  appId: "1:906519457342:web:6b3a8eae8393653761ab6f",
  measurementId: "G-E9JVNH20KS",
  databaseURL: "https://to-do-list-9a2f4-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase();

// === DOM Elements ===
const publicList = document.getElementById("publicTaskList");
const userList = document.getElementById("userTaskList");
const input = document.getElementById("taskInput");
const clickSound = document.getElementById("clickSound");

// === Theme Toggle ===
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("themeIcon").textContent = isDark ? "🌙" : "☀️";
}

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  document.getElementById("themeIcon").textContent = "🌙";
}

// === Auth ===
function signInWithGoogle() {
  signInWithPopup(auth, provider).then(playClick);
}
function signOut() {
  firebaseSignOut(auth);
  playClick();
}

// === Sound ===
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// === Public Tasks (read-only demo tasks) ===
const demoTasks = [
  "Try clicking 'Sign In with Google'",
  "See your private task list",
  "Add / Edit / Delete your tasks"
];
demoTasks.forEach(task => {
  const li = document.createElement("li");
  li.textContent = task;
  li.className = "bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow";
  publicList.appendChild(li);
});

// === Realtime Auth State Listener ===
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("userSection").classList.remove("hidden");
    loadUserTasks(user.uid);
  } else {
    document.getElementById("authSection").classList.remove("hidden");
    document.getElementById("userSection").classList.add("hidden");
    userList.innerHTML = "";
  }
});

// === User Task Handling ===
function loadUserTasks(uid) {
  const tasksRef = ref(db, "tasks/" + uid);
  onValue(tasksRef, snapshot => {
    userList.innerHTML = "";
    const tasks = snapshot.val();
    if (tasks) {
      Object.entries(tasks).forEach(([id, data]) => {
        renderTaskItem(id, data.text, uid);
      });
    }
  });
}

function renderTaskItem(id, text, uid) {
  const li = document.createElement("li");
  li.className = "flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow";

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-1 cursor-pointer";
  span.onclick = () => editTask(id, text, uid);

  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "text-red-500 font-bold ml-4";
  del.onclick = () => {
    remove(ref(db, "tasks/" + uid + "/" + id));
    playClick();
  };

  li.appendChild(span);
  li.appendChild(del);
  userList.appendChild(li);
}

window.addTask = function () {
  const user = auth.currentUser;
  const task = input.value.trim();
  if (!task || !user) return;

  const id = Date.now().toString();
  set(ref(db, "tasks/" + user.uid + "/" + id), { text: task }).then(() => {
    input.value = "";
    playClick();
  });
};

function editTask(id, oldText, uid) {
  const newText = prompt("Edit task:", oldText);
  if (newText && newText.trim() !== oldText) {
    update(ref(db, "tasks/" + uid + "/" + id), { text: newText.trim() });
    playClick();
  }
      }
