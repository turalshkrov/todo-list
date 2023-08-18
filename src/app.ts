import { Task } from "./moduls/task.js";
import { TaskTemplate } from "./moduls/taskTemplate.js";

const taskContainer = document.getElementById('task-container') as HTMLElement;
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const taskImportantInput = document.getElementById('task-important') as HTMLInputElement;
const taskDateInput = document.getElementById('task-date') as HTMLInputElement;
const taskFormSubmitButton = document.getElementById('task-form-submit') as HTMLButtonElement;

let taskArray: Task[] = [];
const taskTemplate = new TaskTemplate(taskContainer);

const submitChecker: Function = () => {
  taskNameInput.value !== "" && taskDateInput.value !== "" 
  ? taskFormSubmitButton.disabled = false
  : taskFormSubmitButton.disabled = true;
}

const addTask: Function = (e: Event) => {
  e.preventDefault();
  const newTask = new Task(taskNameInput.value, taskDateInput.value, taskImportantInput.checked);
  taskTemplate.render(newTask);
  taskNameInput.value = "";
  taskDateInput.value = "";
  taskImportantInput.checked = false;
  submitChecker();
}

const addEventListeners: Function = () => {
  taskForm.addEventListener('change', () =>  submitChecker());
  taskForm.addEventListener('submit', (e) => addTask(e));
}

addEventListeners();
