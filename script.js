const taskInput =
document.getElementById("taskInput");

const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

/* Add Task */

function addTask(){

    if(taskInput.value === ""){
        return;
    }

    const task = {

        text: taskInput.value,

        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

/* Render Tasks */

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
        document.createElement("li");

        li.classList.add("task");

        if(task.completed){

            li.classList.add("completed");
        }

        li.innerHTML = `

        <span>${task.text}</span>

        <div class="task-buttons">

            <button
            class="complete-btn"
            onclick="toggleTask(${index})">

            <i class="fa-solid fa-check"></i>

            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(${index})">

            <i class="fa-solid fa-trash"></i>

            </button>

        </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

/* Complete Task */

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();
}

/* Delete Task */

function deleteTask(index){

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

/* Save Local Storage */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* Update Stats */

function updateStats(){

    document.getElementById("totalTasks")
    .innerHTML = tasks.length;

    const completed =
    tasks.filter(task =>
    task.completed).length;

    document.getElementById("completedTasks")
    .innerHTML = completed;
}

/* Date */

const today = new Date();

document.getElementById("date")
.innerHTML =
today.toDateString();

/* Initial Render */

renderTasks();