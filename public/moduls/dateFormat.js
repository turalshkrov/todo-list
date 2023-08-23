export class DateFormat {
    static format(date) {
        const day = date.getDate() < 10 ? String('0' + date.getDate()) : String(date.getDate());
        const month = date.getMonth() + 1 < 10 ? String('0' + Number(date.getMonth() + 1)) : String(date.getMonth() + 1);
        const year = String(date.getFullYear());
        const newDate = year + '/' + month + '/' + day;
        return newDate;
    }
}
