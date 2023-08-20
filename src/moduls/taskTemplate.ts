import { Task } from "./task";

export class TaskTemplate {
  constructor(private container: HTMLElement) {}

  render(task: Task) {
    const taskItem = document.createElement('div');
    const taskTitleDiv = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDateDiv = document.createElement('div');
    const taskDate = document.createElement('p');
    const dropdown = document.createElement('div');
    const dropdownMenuUl = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const importantButton = document.createElement('button');
    const editButtonLi = document.createElement('li');
    const deleteButtonLi = document.createElement('li');
    const importantButtonLi = document.createElement('li');

    taskItem.id = task.id;
    taskItem.className = 'task-item d-flex align-items-center justify-content-between mt-2 mt-md-3 pe-0 pe-md-3 pe-lg-4';
    taskTitleDiv.className = 'd-flex align-items-center pe-4';
    taskTitle.className = task.finished ? 'text-decoration-line-through mb-0 ms-3 pe-2 pe-lg-4' : 'mb-0 ms-3 pe-2 pe-lg-4';
    taskDateDiv.className = 'd-flex';
    taskDate.className = 'mb-0 me-3 me-lg-5';
    dropdown.className = 'dropdown';
    dropdownMenuUl.className = 'dropdown-menu shadow';
    editButton.className = 'dropdown-item edit-task';
    deleteButton.className = 'dropdown-item delete-task';
    importantButton.className = 'dropdown-item';

    taskTitle.innerText = task.name;
    taskDate.innerText = task.date;
    taskTitleDiv.innerHTML += task.finished ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-circle"></i>';
    taskTitleDiv.appendChild(taskTitle);
    taskTitleDiv.innerHTML += task.isImportant ? '<i class="bi bi-star-fill text-warning"></i>' : '';
    dropdown.innerHTML += '<i class="bi bi-three-dots" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>';
    editButton.innerHTML = '<i class="bi bi-pencil-square text-primary me-2"></i>Edit task';
    deleteButton.innerHTML = '<i class="bi bi-trash text-danger me-2"></i>Delete task';
    importantButton.innerHTML = `<i class="bi bi-star${task.isImportant ? '-fill' : ''} text-warning me-2"></i>Important`;
    
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#taskEditModal');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#taskDeleteModal');
    
    editButtonLi.appendChild(editButton);
    deleteButtonLi.appendChild(deleteButton);
    importantButtonLi.appendChild(importantButton);
    dropdownMenuUl.append(editButtonLi, deleteButtonLi, importantButtonLi);
    taskDateDiv.append(taskDate, dropdown);
    dropdown.appendChild(dropdownMenuUl);
    taskItem.append(taskTitleDiv, taskDateDiv);

    this.container.appendChild(taskItem);
  }
}