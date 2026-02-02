const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

// ================== ADD TASK ==================
function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = {
        id: Date.now(),          // 🔑 ID unik
        text: taskInput.value,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTask(task);
    taskInput.value = "";
}

// ================== RENDER ==================
function renderTask(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.textContent = task.text;

    // restore status selesai
    if (task.completed) {
        li.classList.add("completed");
    }

    // toggle selesai
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStatus(task.id, li.classList.contains("completed"));
    });

    // tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(task.id);
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// ================== STORAGE ==================
function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================== LOAD ==================
function loadTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

// ================== UPDATE ==================
function updateStatus(id, completed) {
    const tasks = getTasks();
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = completed;
        }
    });
    saveTasks(tasks);
}

// ================== DELETE ==================
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}
