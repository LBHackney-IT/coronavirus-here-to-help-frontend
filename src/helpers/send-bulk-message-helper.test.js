import { isPotentialMobileNumber , containsPotentialMobileNumer, appendMobileContact} from './send-bulk-message-helper';

describe('Send bulk message helper', () => {
    it('isPotentialMobileNumber returns false for landline', () => {
        const number ='02028347348';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(false);
    });
    it('isPotentialMobileNumber returns true for a potential mobile numbers that start with 07', () => {
        const number ='07415300588';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(true);
    });
    it('isPotentialMobileNumber returns true for a potential mobile numbers that start with 7', () => {
        const number ='7415300588';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(true);
    });
    it('isPotentialMobileNumber returns true for a potential mobile numbers that start with 447', () => {
        const number ='447415300588';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(true);
    });
    it('isPotentialMobileNumber returns true for a potential mobile numbers that start with +447', () => {
        const number ='+447415300588';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(true);
    });
    it('isPotentialMobileNumber returns true for a potential mobile numbers that start with +447 and have whitespace', () => {
        const number ='   +447415300588';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(true);
    });
    it('isPotentialMobileNumber returns false for a potential mobile numbers that start with +447 and an incorrect length', () => {
        const number ='+4474153005889';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(false);
    });
    it('isPotentialMobileNumber returns false for a potential mobile numbers that are an empty string', () => {
        const number =' ';

        const response = isPotentialMobileNumber(number);

        expect(response).toEqual(false);
    });
    it('containsPotentialMobileNumer returns true for a multiple potential mobile numbers in a string', () => {
        const number ='07415300566/08293/07736599076';

        const response = containsPotentialMobileNumer(number);

        expect(response).toEqual(true);
    });
    it('containsPotentialMobileNumer returns true for a single potential mobile numbers in a string', () => {
        const number ='07415300543';

        const response = containsPotentialMobileNumer(number);

        expect(response).toEqual(true);
    });
    it('appendMobileContact can append a contact to an array', () => {
        let mobileContact = []
        let firstCallBack = {
                             FirstName : "FirstName", 
                             ResidentId: "ResidentId", 
                             Id: "Id", 
                             HelpNeeded:"HelpNeeded"
                           }
        let firstNumber = "07365733856"
                           
        let secondCallback = {
                               FirstName : "FirstName", 
                               ResidentId: "ResidentId", 
                               Id: "Id", 
                               HelpNeeded:"HelpNeeded"
                             }
        let secondNumber = "07365733855"
 
        mobileContact = appendMobileContact(mobileContact, firstNumber, firstCallBack)
        mobileContact = appendMobileContact(mobileContact, secondNumber, secondCallback)
 
        expect(mobileContact).toEqual(
          [
            {
             number: firstNumber, 
             name: firstCallBack.FirstName, 
             residentId: firstCallBack.ResidentId, 
             helpRequestId: firstCallBack.Id, 
             helpNeeded: firstCallBack.HelpNeeded
           },
           {
            number: secondNumber, 
            name: secondCallback.FirstName, 
            residentId: secondCallback.ResidentId, 
            helpRequestId: secondCallback.Id, 
            helpNeeded: secondCallback.HelpNeeded
           }
         ])
     });
});
