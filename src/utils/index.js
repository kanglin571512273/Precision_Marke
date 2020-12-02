export function formatDate(date) {
    let Y = date.getFullYear();
    let M =
        (date.getMonth() + 1).toString().length == 2
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
    let D =
        date.getDate().toString().length == 2
            ? date.getDate()
            : "0" + date.getDate();
    let hh =
        date.getHours().toString().length == 2
            ? date.getHours()
            : "0" + date.getHours();
    let mm =
        date.getMinutes().toString().length == 2
            ? date.getMinutes()
            : "0" + date.getMinutes();
    let ss =
        date.getSeconds().toString().length == 2
            ? date.getSeconds()
            : "0" + date.getSeconds();
    return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
}