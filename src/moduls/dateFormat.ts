export class DateFormat {
  static format(date: Date) {
    const day: string = date.getDate() < 10 ? String('0' + date.getDate()) : String(date.getDate());
    const month: string = date.getMonth() + 1 < 10 ? String('0' + Number(date.getMonth() + 1)) : String(date.getMonth() + 1);
    const year: string = String(date.getFullYear());
    const newDate = year + '/' + month + '/' + day;
    return newDate;
  }
}