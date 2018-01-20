const convertDateString = dateStr => {
    let date = new Date(dateStr),
        dd = date.getDate(),
        mm = date.getMonth() + 1,
        yyyy = date.getFullYear(),
        result = '';

    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    }

    result = dd + '.' + mm + '.' + yyyy;

    return result;
}
export default convertDateString;
