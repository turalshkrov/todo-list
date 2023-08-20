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
let idCounter = 0;
let taskArray = [];
const taskTemplate = new TaskTemplate(taskContainer);
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
const editModalShow = (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const eventTarget = e.target;
    const taskDate = (_e = (_d = (_c = (_b = (_a = eventTarget.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.firstElementChild) === null || _e === void 0 ? void 0 : _e.textContent;
    const taskName = (_l = (_k = (_j = (_h = (_g = (_f = eventTarget.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement) === null || _h === void 0 ? void 0 : _h.parentElement) === null || _j === void 0 ? void 0 : _j.parentElement) === null || _k === void 0 ? void 0 : _k.firstElementChild) === null || _l === void 0 ? void 0 : _l.children[1].textContent;
    const taskImportant = ((_s = (_r = (_q = (_p = (_o = (_m = eventTarget.parentElement) === null || _m === void 0 ? void 0 : _m.parentElement) === null || _o === void 0 ? void 0 : _o.parentElement) === null || _p === void 0 ? void 0 : _p.parentElement) === null || _q === void 0 ? void 0 : _q.parentElement) === null || _r === void 0 ? void 0 : _r.firstElementChild) === null || _s === void 0 ? void 0 : _s.children[2]) === undefined ? false : true;
    const taskId = (_x = (_w = (_v = (_u = (_t = eventTarget.parentElement) === null || _t === void 0 ? void 0 : _t.parentElement) === null || _u === void 0 ? void 0 : _u.parentElement) === null || _v === void 0 ? void 0 : _v.parentElement) === null || _w === void 0 ? void 0 : _w.parentElement) === null || _x === void 0 ? void 0 : _x.id;
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
const addEventListeners = () => {
    taskForm.addEventListener('change', () => submitChecker());
    editForm.addEventListener('change', () => editSubmitChecker());
    taskForm.addEventListener('submit', e => addTask(e));
    editForm.addEventListener('submit', e => saveChanges(e));
    deleteSubmitButton.addEventListener('click', e => deleteTask(e));
};
addEventListeners();
