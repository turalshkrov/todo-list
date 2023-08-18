import { Task } from "./task";

export class TaskTemplate {
  constructor(private container: HTMLElement) {}

  render(task: Task) {
    const taskItem = document.createElement('div');
    const taskTitleDiv = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDateDiv = document.createElement('div');
    const taskDate = document.createElement('p');

    const dropdown = `<div class="dropdown">
                        <i class="bi bi-three-dots" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu shadow">
                          <li><button class="dropdown-item" href="#"><i class="bi bi-pencil-square text-primary me-2"></i>Edit task</button></li>
                          <li><button class="dropdown-item" href="#"><i class="bi bi-trash text-danger me-2"></i>Delete task</button></li>
                          <li><button class="dropdown-item" href="#"><i class="bi bi-star-fill text-warning me-2"></i>Important</button></li>
                        </ul> 
                      </div>`

    taskItem.className = 'task-item d-flex align-items-center justify-content-between mt-2 mt-md-3 pe-0 pe-md-3 pe-lg-4';
    taskTitleDiv.className = 'd-flex align-items-center pe-4';
    taskTitle.className = 'mb-0 ms-3 pe-2 pe-lg-4';
    taskDateDiv.className = 'd-flex';
    taskDate.className = 'mb-0 me-3 me-lg-5';

    taskTitle.innerText = task.name;
    taskDate.innerText = task.date;
    taskTitleDiv.innerHTML += '<i class="bi bi-circle"></i>';
    taskTitleDiv.appendChild(taskTitle);
    taskTitleDiv.innerHTML += task.isImportant ? '<i class="bi bi-star-fill text-warning"></i>' : '';
    taskDateDiv.appendChild(taskDate);
    taskDateDiv.innerHTML += dropdown;
    taskItem.append(taskTitleDiv, taskDateDiv);

    this.container.appendChild(taskItem);
  }
}