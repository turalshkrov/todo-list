export const Task = class Task {
  name: string;
  details: string;
  date: Date;
  isImportant: boolean;

  constructor(name: string, details: string, date: Date, isImportant: boolean) {
    this.name = name;
    this.details = details;
    this.date = date;
    this.isImportant = isImportant;
  }
}