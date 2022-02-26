const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clear = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");

// All events
function loadAllEvents() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clear.addEventListener("click", clearTask);
  filter.addEventListener("keyup", filterTasks);
}

loadAllEvents();

function getTasks(){
    
    let tasks;
  
    if(localStorage.getItem('tasks') === null){
      tasks = []
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(e => {
            // Create a li element
    const li = document.createElement("li");

    // Add a class-name to the li element
    li.className = "collection-item";

    // Append the input value to the list Element
    li.appendChild(document.createTextNode(e));

    // Create an a element

    const del = document.createElement("a");

    // Add a className to the del element
    del.className = "delete-item secondary-content";

    // Add x icon to the del element
    del.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the del to the li element
    li.appendChild(del);

    // Append the li to the taskList

    taskList.appendChild(li);

    })
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value) {
    // Create a li element
    const li = document.createElement("li");

    // Add a class-name to the li element
    li.className = "collection-item";

    // Append the input value to the list Element
    li.appendChild(document.createTextNode(taskInput.value));

    // Create an a element

    const del = document.createElement("a");

    // Add a className to the del element
    del.className = "delete-item secondary-content";

    // Add x icon to the del element
    del.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the del to the li element
    li.appendChild(del);

    // Append the li to the taskList

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = "";


  }
}

function storeTaskInLocalStorage(value){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(value);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);


}

function removeTaskFromLocalStorage(e){
  let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
  
    tasks.forEach((task, i) => {
        if(e.textContent === task){
            tasks.splice(i, 1);
        }
    })

    
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearAllLocalStorage()
}

function clearAllLocalStorage(){
    localStorage.clear()
}


function filterTasks(e){
    let value = e.target.value;

    document.querySelectorAll(".collection-item").forEach(task => {

        const item = task.firstChild.textContent
        if(item.indexOf(value) !== -1){
            task.style.display = "block"
        }else{
            task.style.display = "none"
        }
    })
}
