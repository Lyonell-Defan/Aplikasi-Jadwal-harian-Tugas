const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    // 🔥 PENTING: restore status selesai
    if (task.completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskStatus(task.text, li.classList.contains("completed"));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        deleteTask(task.text);
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task));
}

function updateTaskStatus(text, completed) {
    const tasks = getTasks();
    tasks.forEach(task => {
        if (task.text === text) {
            task.completed = completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
