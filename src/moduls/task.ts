export class Task {
  name: string;
  date: string;
  isImportant: boolean;
  finished: boolean;
  id: string;

  constructor(name: string, date: string, isImportant: boolean, finished: boolean, id: string) {
    this.name = name;
    this.date = date;
    this.isImportant = isImportant;
    this.finished = finished;
    this.id = id;
  }
}