// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

let tasks;

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners(){
   // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task Event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear Task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage (LS)
function getTasks(){
  
  checkTasksFromLocalStorage();

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task, Notes: so the (e) is there bc it is an event handler
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage / This is storing the input value of whatever the user types in.
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';


  e.preventDefault();
}

// Store Task /   
function storeTaskInLocalStorage(task){
  checkTasksFromLocalStorage();
  
  // Take the parameter and push it into the array tasks
  tasks.push(task);
  // Set it bask to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete this item?')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  checkTasksFromLocalStorage();

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e){
  // taskList.innerHTML = ''; This is one way to do it.

  // Faster way of doing it
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LOS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
  // This will give us whatever is being typed in.
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function checkTasksFromLocalStorage(){
  //This function sets a task variable and if there is nothing in the local storage it sets the tasks variable to an empty array.
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
    //Else, it sets tasks equal to whatever is in local storage.
  } else {
    //Local storage on stores strings so we are using JSON.parse to parse the strings as JSON.
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
}