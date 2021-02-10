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

  if(isNaN(d.getTime()))  return "";
  return [year, month, day].join('-') + time;
}

export const getAuthor = (text) => {
  return text.slice(0 ,text.indexOf(" : "))
}

export const getDate = (text) => {
  return text.slice(text.indexOf(" : ") + 3, text.indexOf("GMT"))
}

export const getNote = (text) => {
  return text.slice(text.indexOf("GMT") + 16)
}
export const getNonJsonCasenotesArray = (text) =>{
  let separators = ["------\r\n\r\n\r\n", "------\n\n\n"];
  return text.split(new RegExp(separators.join("|"), "g"));
}

export const getPowerBICaseNotesArray = (text) => {
  const array = text.split('[');
  return array.map(x => {
    const [noteDate, note] = x.split(']')
    return {noteDate: new Date(noteDate), note}}).filter(x => x.note)
} 
