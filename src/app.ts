import { Task } from "./moduls/task.js";

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const taskDetailsInput = document.getElementById('task-details') as HTMLInputElement;
const taskDateInput = document.getElementById('task-date') as HTMLInputElement;
const taskFormSubmitButton = document.getElementById('task-form-submit') as HTMLButtonElement;

let taskArray: Task[] = [];

const submitChecker = () => {
  taskNameInput.value !== "" && taskDateInput.value !== "" 
  ? taskFormSubmitButton.disabled = false
  : taskFormSubmitButton.disabled = true;
}

const addEventListeners = () => {
  taskForm.addEventListener('change', submitChecker);
}

addEventListeners();
