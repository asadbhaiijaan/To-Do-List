import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCG48IFs2apvNkyFC_VrZhFAdWhwf9D12A",
  authDomain: "to-do-list-9a2f4.firebaseapp.com",
  projectId: "to-do-list-9a2f4",
  storageBucket: "to-do-list-9a2f4.firebasestorage.app",
  messagingSenderId: "906519457342",
  appId: "1:906519457342:web:6b3a8eae8393653761ab6f",
  measurementId: "G-E9JVNH20KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-in with Google
window.signInWithGoogle = function() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("userName").textContent = `Hello, ${user.displayName}!`;
      document.getElementById("authSection").classList.add("hidden");
      document.getElementById("userSection").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
};

// Sign-out function
window.signOut = function() {
  signOut(auth).then(() => {
    document.getElementById("userSection").classList.add("hidden");
    document.getElementById("authSection").classList.remove("hidden");
  });
};

// Task adding function
window.addTask = function() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task) {
    const taskList = document.getElementById("userTaskList");
    const taskItem = document.createElement("li");
    taskItem.classList.add("p-3", "bg-gray-200", "dark:bg-gray-800", "rounded-lg", "shadow-md");
    taskItem.textContent = task;
    taskList.appendChild(taskItem);
    taskInput.value = ""; // Clear the input after adding
  }
};
