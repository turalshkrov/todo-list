const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDetailsInput = document.getElementById('task-details');
const taskDateInput = document.getElementById('task-date');
const taskFormSubmitButton = document.getElementById('task-form-submit');
let taskArray = [];
const submitChecker = () => {
    taskNameInput.value !== "" && taskDateInput.value !== ""
        ? taskFormSubmitButton.disabled = false
        : taskFormSubmitButton.disabled = true;
};
const addEventListeners = () => {
    taskForm.addEventListener('change', submitChecker);
};
addEventListeners();
export {};
