import { Task } from "./moduls/task.js";
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskImportantInput = document.getElementById('task-important');
const taskDateInput = document.getElementById('task-date');
const taskFormSubmitButton = document.getElementById('task-form-submit');
let taskArray = [];
const submitChecker = () => {
    taskNameInput.value !== "" && taskDateInput.value !== ""
        ? taskFormSubmitButton.disabled = false
        : taskFormSubmitButton.disabled = true;
};
const addTask = (e) => {
    e.preventDefault();
    const newTask = new Task(taskNameInput.value, taskDateInput.value, taskImportantInput.checked);
    console.log(newTask);
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskImportantInput.checked = false;
    submitChecker();
};
const addEventListeners = () => {
    taskForm.addEventListener('change', () => submitChecker());
    taskForm.addEventListener('submit', (e) => addTask(e));
};
addEventListeners();
