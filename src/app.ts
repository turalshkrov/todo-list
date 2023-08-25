import { Task } from "./moduls/task.js";
import { TaskTemplate } from "./moduls/taskTemplate.js";
import { DateFormat } from "./moduls/dateFormat.js";

const taskContainer = document.getElementById('task-container') as HTMLElement;
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const editForm = document.getElementById('edit-form') as HTMLFormElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const editNameInput = document.getElementById('edit-name') as HTMLInputElement;
const taskImportantInput = document.getElementById('task-important') as HTMLInputElement;
const editImportantInput = document.getElementById('edit-important') as HTMLInputElement;
const taskDateInput = document.getElementById('task-date') as HTMLInputElement;
const editDateInput = document.getElementById('edit-date') as HTMLInputElement;
const taskFormSubmitButton = document.getElementById('task-form-submit') as HTMLButtonElement;
const editFormSubmitButton = document.getElementById('edit-form-submit') as HTMLButtonElement;
const deleteSubmitButton = document.getElementById('delete-task-submit') as HTMLButtonElement;
const sortInput = document.getElementById('sort') as HTMLInputElement;
const sortOrderButton = document.getElementById('sort-icon') as HTMLElement;
const allTasksLabel = document.getElementById('all-tasks-count') as HTMLElement;
const todayTasksLabel = document.getElementById('today-tasks-count') as HTMLElement;
const upcomingTasksLabel = document.getElementById('upcoming-tasks-count') as HTMLElement;
const importantTasksLabel = document.getElementById('important-tasks-count') as HTMLElement;
const navbarUl = document.getElementById('navbar-ul') as HTMLElement;

const taskTemplate = new TaskTemplate(taskContainer);

// @ts-ignore
let taskArray: Task[] = localStorage.getItem('taskArray') === null ? [] : JSON.parse(localStorage.getItem('taskArray'));
let idCounter: number = localStorage.getItem('idCounter') === null ? 0 : Number(localStorage.getItem('idCounter'));
let todayTasks: Task[] = [];
let upcomingTasks: Task[] = [];
let importantTasks: Task[] = [];
let currentLabel: string = 'all';

const arraysUpdate: Function = () => {
  const q = new Date();
  const m = q.getMonth();
  const d = q.getDate();
  const y = q.getFullYear();
  const todayDate = new Date(y,m,d);
  const todayString = DateFormat.format(todayDate);

  todayTasks = taskArray.filter(task => {
    const date = new Date(task.date);
    const newdate = DateFormat.format(date);
    return newdate === todayString;
  });
  
  upcomingTasks = taskArray.filter(task => {
    const date = new Date(task.date);
    const taskDate = DateFormat.format(date);
    return taskDate > todayString;
  });

  importantTasks = taskArray.filter(task => task.isImportant);
}

const countLabelsUpdate: Function = () => {
  allTasksLabel.innerText = taskArray.length > 0 ? String(taskArray.length) : '';
  todayTasksLabel.innerText = todayTasks.length > 0 ? String(todayTasks.length) : '';
  upcomingTasksLabel.innerText = upcomingTasks.length > 0 ? String(upcomingTasks.length) : '';
  importantTasksLabel.innerText = importantTasks.length > 0 ? String(importantTasks.length) : '';
}

const updateUI: Function = () => {
  let renderArray: Task[] = [];
  arraysUpdate();
  countLabelsUpdate();
  switch (currentLabel) {
    case 'all':
      renderArray = taskArray;
      break;
    case 'today':
      renderArray = todayTasks;
      break;
    case 'upcoming':
      renderArray = upcomingTasks;
      break;
    case 'important':
      renderArray = importantTasks;
      break;
  }

  taskContainer.innerHTML = '';
  renderArray.map(task => taskTemplate.render(task));

  let editTaskButtons: Element[] = [...document.querySelectorAll('.edit-task')];
  editTaskButtons.map(button => button.addEventListener('click', e => editModalShow(e)));

  let deleteTaskButtons: Element[] = [...document.querySelectorAll('.delete-task')];
  deleteTaskButtons.map(button => button.addEventListener('click', e => deleteModalShow(e)));

  let finishedTaskButtons: Element[] = [...document.querySelectorAll('.finish-check')];
  finishedTaskButtons.map(button => button.addEventListener('click', e => taskFinished(e)));

  let makeImportantButtons: Element[] = [...document.querySelectorAll('.make-important')];
  makeImportantButtons.map(button => button.addEventListener('click', e => makeImportant(e)));
}

const filterTasks: Function = (e: Event) => {
  let eventTarget = e.target as HTMLElement;
  while (eventTarget.className !== 'nav-item d-flex justify-content-between my-2') {
    eventTarget = eventTarget.parentElement!;
  }
  switch (eventTarget.id) {
    case 'all-tasks':
      currentLabel = 'all';
      break;
    case 'today-tasks':
      currentLabel = 'today';
      break;
    case 'upcoming-tasks':
      currentLabel = 'upcoming';
      break;
    case 'important-tasks':
      currentLabel = 'important';
      break;
  }
  updateUI();
}

const submitChecker: Function = () => {
  taskNameInput.value !== "" && taskDateInput.value !== "" 
  ? taskFormSubmitButton.disabled = false
  : taskFormSubmitButton.disabled = true;
}

const editSubmitChecker: Function = () => {
  editNameInput.value !== "" && editDateInput.value !== "" 
  ? editFormSubmitButton.disabled = false
  : editFormSubmitButton.disabled = true;
}

const addTask: Function = (e: Event) => {
  e.preventDefault();
  const newTask = new Task(taskNameInput.value, taskDateInput.value, taskImportantInput.checked, false,  `t-${idCounter}`);
  idCounter += 1;
  taskArray.push(newTask);
  updateUI(taskArray);
  
  taskNameInput.value = "";
  taskDateInput.value = "";
  taskImportantInput.checked = false;
  submitChecker();

  localStorage.setItem('idCounter', String(idCounter));
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

const saveChanges: Function = (e: Event) => {
  e.preventDefault();
  const eventTarget = e.target as HTMLButtonElement;
  const taskId: string = eventTarget.getAttribute('edit-task-id')!;
  
  const editTask = new Task(editNameInput.value, editDateInput.value, editImportantInput.checked, false, taskId);
  taskArray.forEach((task, index) => taskArray[index] = task.id === taskId ? editTask : task);
  updateUI();

  editNameInput.value = '';
  editDateInput.value = '';
  editImportantInput.checked = false;

  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

const editModalShow: Function = (e: Event) => {
  let eventTarget = e.target as HTMLElement;
  while (!eventTarget.className.includes('dropdown-item')) {
    eventTarget = eventTarget.parentElement!;
  }
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;
  const taskName = taskArray.filter(task => task.id == taskId)[0].name;
  const taskDate = taskArray.filter(task => task.id == taskId)[0].date;
  const taskImportant = taskArray.filter(task => task.id == taskId)[0].isImportant;

  editNameInput.value = taskName;
  editDateInput.value = taskDate;
  editImportantInput.checked = taskImportant;
  editForm.setAttribute('edit-task-id', taskId);
}

const deleteModalShow: Function = (e: Event) => {
  let eventTarget = e.target as HTMLElement;
  while (!eventTarget.className.includes('dropdown-item')) {
    eventTarget = eventTarget.parentElement!;
  }
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;
  deleteSubmitButton.setAttribute('delete-task-id', taskId);
}

const deleteTask: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId: string = eventTarget.getAttribute('delete-task-id')!;
  taskArray = taskArray.filter(task => task.id !== taskId);
  updateUI();

  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

const taskFinished: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId = eventTarget.parentElement?.parentElement?.id!;
  taskArray.forEach((task)=> task.finished = task.id === taskId ? !task.finished : task.finished);
  updateUI();

  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

const makeImportant: Function = (e: Event) => {
  let eventTarget = e.target as HTMLElement;
  while (!eventTarget.className.includes('dropdown-item')) {
    eventTarget = eventTarget.parentElement!;
  }
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;
  taskArray.forEach((task)=> task.isImportant = task.id === taskId ? !task.isImportant : task.isImportant);
  updateUI();

  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

const sortTaskArray: Function = () => {
  switch (sortInput.value) {
    case 'Default':
      taskArray.sort((a,b) => a.id > b.id ? 1 : -1);
      break;
    case 'Name':
      taskArray.sort((a,b) => a.name > b.name ? 1 : -1);
      break;
    case 'Date':
      taskArray.sort((a,b) => a.date > b.date ? 1 : -1);
      break;
  }
  updateUI();
}

const sortOrder: Function = (e: Event) => {
  const eventTarget: Element = e.target as HTMLElement;
  eventTarget.className = eventTarget.className === 'bi bi-sort-up fs-5 ms-1' ? 'bi bi-sort-down fs-5 ms-1' : 'bi bi-sort-up fs-5 ms-1';
  taskArray.reverse();
  updateUI();
}

const addEventListeners: Function = () => {
  taskForm.addEventListener('change', () =>  submitChecker());
  editForm.addEventListener('change', () =>  editSubmitChecker());
  taskForm.addEventListener('submit', e => addTask(e));
  editForm.addEventListener('submit', e => saveChanges(e));
  deleteSubmitButton.addEventListener('click', e => deleteTask(e));
  sortInput.addEventListener('change', () => sortTaskArray());
  sortOrderButton.addEventListener('click', e => sortOrder(e));
  navbarUl.addEventListener('click', e => filterTasks(e));
}

addEventListeners();
updateUI();