export const isJSON = text => {
  if (!text) return false;
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }
  return true;
};

export const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  let time = ' '+ ((d.getHours().toString().length==1) ? '0' + d.getHours() : d.getHours()) +':'+ 
                  ((d.getMinutes().toString().length==1) ?  '0' + d.getMinutes() : d.getMinutes())

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-') + time;
}