export class Task {
  name: string;
  date: string;
  isImportant: boolean;
  id: string;

  constructor(name: string, date: string, isImportant: boolean, id: string) {
    this.name = name;
    this.date = date;
    this.isImportant = isImportant;
    this.id = id;
  }
}