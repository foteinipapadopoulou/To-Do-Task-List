// Define Ui vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".task-list");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const filterBtn = document.querySelector("#filterBtn");
const taskInput = document.querySelector("#task");
const resetTask = document.querySelector("#resetTaskButton"); 

loadEventListeners();
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filterBtn.addEventListener("click", filterTasks);
    taskInput.addEventListener("keyup", clearTaskInput);
    resetTask.addEventListener("click", resetTaskInput );
}   

function getTasks(){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));       
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'task-list-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fa fa-ellipsis-vertical'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
    });
}


function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
        return;
    }
    const li = document.createElement('li');
    li.className = 'task-list-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
    li.appendChild(link);
    taskList.appendChild(li);
    resetTask.style.visibility = "hidden";
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));       
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function clearTasks(e){
   // taskList.innerHTML = '';
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
} 

function filterTasks(e){
    const text = filter.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.task-list-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );

}

function storeTaskInLocalStorage(task){
    let tasks ;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));       
    }

    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function clearTaskInput(task){
    if (task == 0){
        resetTask.style.display = "none";
    } else {
        resetTask.style.display = "inline";
    }
}

function resetTaskInput(){
    resetTask.style.display = "none";
}