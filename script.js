const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// ambil data dari localStorage saat halaman dibuka
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (taskInput.value === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    saveTask(task);
    renderTask(task);

    taskInput.value = "";
}

// simpan ke localStorage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ambil semua task
function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

// tampilkan task
function renderTask(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    li.onclick = function () {
        task.completed = !task.completed;
        updateTasks();
        li.classList.toggle("completed");
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        deleteTask(task.text);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// hapus task
function deleteTask(text) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// update status checklist
function updateTasks() {
    const items = document.querySelectorAll("li");
    let tasks = [];

    items.forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load ulang saat refresh
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}
