import { Task } from "./moduls/task.js";
import { TaskTemplate } from "./moduls/taskTemplate.js";
const taskContainer = document.getElementById('task-container');
const taskForm = document.getElementById('task-form');
const editForm = document.getElementById('edit-form');
const taskNameInput = document.getElementById('task-name');
const editNameInput = document.getElementById('edit-name');
const taskImportantInput = document.getElementById('task-important');
const editImportantInput = document.getElementById('edit-important');
const taskDateInput = document.getElementById('task-date');
const editDateInput = document.getElementById('edit-date');
const taskFormSubmitButton = document.getElementById('task-form-submit');
const editFormSubmitButton = document.getElementById('edit-form-submit');
const deleteSubmitButton = document.getElementById('delete-task-submit');
const sortInput = document.getElementById('sort');
const sortOrderButton = document.getElementById('sort-icon');
const allTasksLabel = document.getElementById('all-tasks-count');
const todayTasksLabel = document.getElementById('today-tasks-count');
const upcomingTasksLabel = document.getElementById('upcoming-tasks-count');
const importantTasksLabel = document.getElementById('importanat-tasks-count');
let idCounter = 0;
let taskArray = [];
const taskTemplate = new TaskTemplate(taskContainer);
const labelUpdate = () => {
    const q = new Date();
    const m = q.getMonth();
    const d = q.getDate();
    const y = q.getFullYear();
    const today = new Date(y, m, d).toDateString();
    let todayTasks = taskArray.filter(task => new Date(task.date).toDateString() === today);
    allTasksLabel.innerText = String(taskArray.length);
    todayTasksLabel.innerText = String(todayTasks.length);
};
const updateUI = () => {
    taskContainer.innerHTML = '';
    taskArray.map(task => taskTemplate.render(task));
    let editTaskButtons = [...document.querySelectorAll('.edit-task')];
    editTaskButtons.map(button => button.addEventListener('click', e => editModalShow(e)));
    let deleteTaskButtons = [...document.querySelectorAll('.delete-task')];
    deleteTaskButtons.map(button => button.addEventListener('click', e => deleteModalShow(e)));
    let finishedTaskButtons = [...document.querySelectorAll('.finish-check')];
    finishedTaskButtons.map(button => button.addEventListener('click', e => taskFinished(e)));
    let makeImportantButtons = [...document.querySelectorAll('.make-important')];
    makeImportantButtons.map(button => button.addEventListener('click', e => makeImportant(e)));
    labelUpdate();
};
const submitChecker = () => {
    taskNameInput.value !== "" && taskDateInput.value !== ""
        ? taskFormSubmitButton.disabled = false
        : taskFormSubmitButton.disabled = true;
};
const editSubmitChecker = () => {
    editNameInput.value !== "" && editDateInput.value !== ""
        ? editFormSubmitButton.disabled = false
        : editFormSubmitButton.disabled = true;
};
const addTask = (e) => {
    e.preventDefault();
    const newTask = new Task(taskNameInput.value, taskDateInput.value, taskImportantInput.checked, false, `t-${idCounter}`);
    idCounter += 1;
    taskArray.push(newTask);
    updateUI();
    taskNameInput.value = "";
    taskDateInput.value = "";
    taskImportantInput.checked = false;
    submitChecker();
};
const saveChanges = (e) => {
    e.preventDefault();
    const eventTarget = e.target;
    const taskId = eventTarget.getAttribute('edit-task-id');
    const editTask = new Task(editNameInput.value, editDateInput.value, editImportantInput.checked, false, taskId);
    taskArray.forEach((task, index) => taskArray[index] = task.id === taskId ? editTask : task);
    updateUI();
    editNameInput.value = '';
    editDateInput.value = '';
    editImportantInput.checked = false;
};
const editModalShow = (e) => {
    var _a, _b, _c, _d, _e;
    const eventTarget = e.target;
    const taskId = (_e = (_d = (_c = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.id;
    const taskName = taskArray.filter(task => task.id === taskId)[0].name;
    const taskDate = taskArray.filter(task => task.id === taskId)[0].date;
    const taskImportant = taskArray.filter(task => task.id === taskId)[0].isImportant;
    editNameInput.value = taskName;
    editDateInput.value = taskDate;
    editImportantInput.checked = taskImportant;
    editForm.setAttribute('edit-task-id', taskId);
};
const deleteModalShow = (e) => {
    var _a, _b, _c, _d, _e;
    const eventTarget = e.target;
    const taskId = (_e = (_d = (_c = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.id;
    deleteSubmitButton.setAttribute('delete-task-id', taskId);
};
const deleteTask = (e) => {
    const eventTarget = e.target;
    const taskId = eventTarget.getAttribute('delete-task-id');
    taskArray = taskArray.filter(task => task.id !== taskId);
    updateUI();
};
const taskFinished = (e) => {
    var _a, _b;
    const eventTarget = e.target;
    const taskId = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id;
    taskArray.forEach((task) => task.finished = task.id === taskId ? !task.finished : task.finished);
    updateUI();
};
const makeImportant = (e) => {
    var _a, _b, _c, _d, _e;
    const eventTarget = e.target;
    const taskId = (_e = (_d = (_c = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.id;
    taskArray.forEach((task) => task.isImportant = task.id === taskId ? !task.isImportant : task.isImportant);
    updateUI();
};
const sortTaskArray = () => {
    switch (sortInput.value) {
        case 'Default':
            taskArray.sort((a, b) => a.id > b.id ? 1 : -1);
            break;
        case 'Name':
            taskArray.sort((a, b) => a.name > b.name ? 1 : -1);
            break;
        case 'Date':
            taskArray.sort((a, b) => a.date > b.date ? 1 : -1);
            break;
    }
    updateUI();
};
const sortOrder = (e) => {
    const eventTarget = e.target;
    eventTarget.className = eventTarget.className === 'bi bi-sort-up fs-5 ms-1' ? 'bi bi-sort-down fs-5 ms-1' : 'bi bi-sort-up fs-5 ms-1';
    taskArray.reverse();
    updateUI();
};
const addEventListeners = () => {
    taskForm.addEventListener('change', () => submitChecker());
    editForm.addEventListener('change', () => editSubmitChecker());
    taskForm.addEventListener('submit', e => addTask(e));
    editForm.addEventListener('submit', e => saveChanges(e));
    deleteSubmitButton.addEventListener('click', e => deleteTask(e));
    sortInput.addEventListener('change', () => sortTaskArray());
    sortOrderButton.addEventListener('click', e => sortOrder(e));
};
addEventListeners();
