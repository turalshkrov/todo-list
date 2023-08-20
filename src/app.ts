import { Task } from "./moduls/task.js";
import { TaskTemplate } from "./moduls/taskTemplate.js";

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

let idCounter = 0;
let taskArray: Task[] = [];
const taskTemplate = new TaskTemplate(taskContainer);

const updateUI: Function = () => {
  taskContainer.innerHTML = '';
  taskArray.map(task => taskTemplate.render(task));

  let editTaskButtons: Element[] = [...document.querySelectorAll('.edit-task')];
  editTaskButtons.map(button => button.addEventListener('click', e => editModalShow(e)));

  let deleteTaskButtons: Element[] = [...document.querySelectorAll('.delete-task')];
  deleteTaskButtons.map(button => button.addEventListener('click', e => deleteModalShow(e)));

  let finishedTaskButtons: Element[] = [...document.querySelectorAll('.finish-check')];
  finishedTaskButtons.map(button => button.addEventListener('click', e => taskFinished(e)));

  let makeImportantButtons: Element[] = [...document.querySelectorAll('.make-important')];
  makeImportantButtons.map(button => button.addEventListener('click', e => makeImportant(e)));
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

const editModalShow: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskDate = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.textContent!;
  const taskName = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.children[1].textContent!;
  const taskImportant = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.children[2] === undefined ? false : true!;
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;

  editNameInput.value = taskName;
  editDateInput.value = taskDate;
  editImportantInput.checked = taskImportant;
  editForm.setAttribute('edit-task-id', taskId);
}

const deleteModalShow: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;
  deleteSubmitButton.setAttribute('delete-task-id', taskId);
}

const deleteTask: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId: string = eventTarget.getAttribute('delete-task-id')!;
  taskArray = taskArray.filter(task => task.id !== taskId);
  updateUI();
}

const taskFinished: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId = eventTarget.parentElement?.parentElement?.id!;
  taskArray.forEach((task)=> task.finished = task.id === taskId ? !task.finished : task.finished);
  updateUI();
}

const makeImportant: Function = (e: Event) => {
  const eventTarget = e.target as HTMLButtonElement;
  const taskId = eventTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id!;
  taskArray.forEach((task)=> task.isImportant = task.id === taskId ? !task.isImportant : task.isImportant);
  updateUI();
}

const addTask: Function = (e: Event) => {
  e.preventDefault();
  const newTask = new Task(taskNameInput.value, taskDateInput.value, taskImportantInput.checked, false,  `t-${idCounter}`);
  idCounter += 1;
  taskArray.push(newTask);
  updateUI();
  
  taskNameInput.value = "";
  taskDateInput.value = "";
  taskImportantInput.checked = false;
  submitChecker();
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
}

const addEventListeners: Function = () => {
  taskForm.addEventListener('change', () =>  submitChecker());
  editForm.addEventListener('change', () =>  editSubmitChecker());
  taskForm.addEventListener('submit', e => addTask(e));
  editForm.addEventListener('submit', e => saveChanges(e));
  deleteSubmitButton.addEventListener('click', e => deleteTask(e));
}

addEventListeners();