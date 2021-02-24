export const isValidMobileNumberFormat = (number) => {
  if(!number){
    return false
  }
  let trimmedNumber = number.trim();
  if (
    (trimmedNumber?.substring(0, 2) == "07") && trimmedNumber.length == 11||
    (trimmedNumber?.substring(0, 1) == "7") && trimmedNumber.length == 10 ||
    (trimmedNumber?.substring(0, 4) == "+447") && trimmedNumber.length == 13||
    (trimmedNumber?.substring(0, 3) == "447") && trimmedNumber.length == 12)
    {
    return true
    }
  return false
}
export const containsPotentialMobileNumer = (number) => {
  if(!number){
    return false
  }
  let contansPotentialMobile=[]
  if(isValidMobileNumberFormat(number)){
    number
    return true
  } 

  if(number.includes('/')){
    let numbers = number.split("/")
    numbers.forEach(number => {
      if(isValidMobileNumberFormat(number)){
        contansPotentialMobile.push(true)
      }
    });
  }
  if(contansPotentialMobile.includes(true)){
    return true
  }
  return false
}

export const appendMobileContact = (mobileContacts, number, callback) =>{
  if(number.includes('/')){
    let numbers = number.split("/")
    numbers.forEach(number => {
      if(sValidMobileNumberFormat(number)){
        mobileContacts.push(
          { 
            number:number, 
            name: callback.FirstName, 
            residentId:callback.ResidentId, 
            helpRequestId:callback.Id, 
            helpNeeded: callback.HelpNeeded
          })
      }
    });
  }else if(isValidMobileNumberFormat(number)){
    mobileContacts.push(
      {
        number: number, 
        name: callback.FirstName, 
        residentId:callback.ResidentId, 
        helpRequestId:callback.Id, 
        helpNeeded: callback.HelpNeeded
      })
  }
  return mobileContacts
}
