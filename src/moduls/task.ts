export class Task {
  name: string;
  date: string;
  isImportant: boolean;

  constructor(name: string, date: string, isImportant: boolean) {
    this.name = name;
    this.date = date;
    this.isImportant = isImportant;
  }
}