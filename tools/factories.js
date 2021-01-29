const faker = require('faker');
faker.locale = 'en';
const randexp = require('randexp').randexp;
const randomInt = (maxN = 10) => Math.floor(Math.random() * maxN + 1);
const randomNullableBool = () => (Math.random() > 0.5 ? true : false);
const nullOrValue = (val) => (Math.random() > 0.5 ? null : val);
function nItems(quantity, f, ...args) {
    const collection = [];
    for (let q = quantity; q > 0; q--) collection.push(f(...args));
    return collection;
}

export class HelpRequestCallV4APIEntity {
    sample(arg = {}) {
        const Id = arg.Id || randomInt(100);
        const callOutcomeExp = faker.random.boolean()
            ? /((callback_complete|call_rescheduled|no_answer_machine)(,follow_up_requested)?)|follow_up_requested/
            : /(refused_to_engage|wrong_number)(callback_complete)?/;
        return Object.freeze({
            Id,
            HelpRequestId: arg.HelpRequestId || randomInt(),
            CallType:
                arg.CallType ||
                nullOrValue(randexp(/Contact Tracing|Shielding|Welfare|Help Request/)),
            CallDirection: arg.CallDirection || nullOrValue(randexp(/outbound|inbound/)),
            CallOutcome: arg.CallOutcome || nullOrValue(randexp(callOutcomeExp)),
            CallDateTime: arg.CallDateTime || faker.date.recent(40),
            CallHandler:
                arg.CallHandler || nullOrValue(`${faker.name.firstName()} ${faker.name.lastName()}`)
        });
    }
}

export class HelpRequestV4APIEntity {
    sample(arg = {}) {
        const Id = arg.Id || randomInt();
        const onBehalfFirstName = faker.name.firstName();
        const onBehalfLastName = faker.name.lastName();
        return Object.freeze({
            Id,
            ResidentId: arg.ResidentId || randomInt(),
            IsOnBehalf: arg.IsOnBehalf || randomNullableBool(),
            ConsentToCompleteOnBehalf: arg.ConsentToCompleteOnBehalf || randomNullableBool(),
            OnBehalfFirstName: arg.OnBehalfFirstName || nullOrValue(faker.name.firstName()),
            OnBehalfLastName: arg.OnBehalfLastName || nullOrValue(faker.name.lastName()),
            OnBehalfEmailAddress:
                arg.OnBehalfEmailAddress ||
                nullOrValue(faker.internet.email(onBehalfFirstName, onBehalfLastName)),
            OnBehalfContactNumber: arg.OnBehalfContactNumber || nullOrValue(randexp(/07\d{9}/)),
            RelationshipWithResident:
                arg.RelationshipWithResident || nullOrValue(faker.lorem.word()),
            GettingInTouchReason: arg.GettingInTouchReason || nullOrValue(faker.lorem.words(3)),
            HelpWithAccessingFood: arg.HelpWithAccessingFood || nullOrValue(randomNullableBool()),
            HelpWithAccessingSupermarketFood:
                arg.HelpWithAccessingSupermarketFood || randomNullableBool(),
            HelpWithCompletingNssForm: arg.HelpWithCompletingNssForm || randomNullableBool(),
            HelpWithShieldingGuidance: arg.HelpWithShieldingGuidance || randomNullableBool(),
            HelpWithNoNeedsIdentified: arg.HelpWithNoNeedsIdentified || randomNullableBool(),
            HelpWithAccessingMedicine: arg.HelpWithAccessingMedicine || randomNullableBool(),
            HelpWithAccessingOtherEssentials:
                arg.HelpWithAccessingOtherEssentials || randomNullableBool(),
            HelpWithDebtAndMoney: arg.HelpWithDebtAndMoney || randomNullableBool(),
            HelpWithHealth: arg.HelpWithHealth || randomNullableBool(),
            HelpWithMentalHealth: arg.HelpWithMentalHealth || randomNullableBool(),
            HelpWithAccessingInternet: arg.HelpWithAccessingInternet || randomNullableBool(),
            HelpWithHousing: arg.HelpWithHousing || randomNullableBool(),
            HelpWithJobsOrTraining: arg.HelpWithJobsOrTraining || randomNullableBool(),
            HelpWithChildrenAndSchools: arg.HelpWithChildrenAndSchools || randomNullableBool(),
            HelpWithDisabilities: arg.HelpWithDisabilities || randomNullableBool(),
            HelpWithSomethingElse: arg.HelpWithSomethingElse || randomNullableBool(),
            MedicineDeliveryHelpNeeded: arg.MedicineDeliveryHelpNeeded || randomNullableBool(),
            WhenIsMedicinesDelivered:
                arg.WhenIsMedicinesDelivered ||
                nullOrValue(Math.random() < 0.2 ? faker.date.weekday() : ''),
            UrgentEssentials:
                arg.UrgentEssentials ||
                nullOrValue(Math.random() < 0.2 ? faker.lorem.words(5) : ''),
            UrgentEssentialsAnythingElse:
                arg.UrgentEssentialsAnythingElse ||
                nullOrValue(Math.random() < 0.2 ? faker.lorem.words(5) : ''),
            CurrentSupport: arg.CurrentSupport || nullOrValue(faker.random.word()),
            CurrentSupportFeedback: arg.CurrentSupportFeedback || nullOrValue(faker.lorem.words(5)),
            DateTimeRecorded: arg.DateTimeRecorded || nullOrValue(faker.date.recent(40)),
            InitialCallbackCompleted: arg.InitialCallbackCompleted || randomNullableBool(),
            CallbackRequired:
                arg.CallbackRequired || Math.random() > 0.5 ? randomNullableBool() : true,
            CaseNotes: arg.CaseNotes || nullOrValue(nItems(3, faker.lorem.words).join(' | ')),
            AdviceNotes: arg.AdviceNotes || nullOrValue(faker.lorem.words()),
            HelpNeeded:
                arg.HelpNeeded ||
                nullOrValue(randexp(/Contact Tracing|Shielding|Welfare|Help Request/)),
            NhsCtasId: arg.NhsCtasId || nullOrValue(randexp(/[^\W_]{8}/)),
            AssignedTo:
                arg.AssignedTo || nullOrValue(`${faker.name.firstName()} ${faker.name.lastName()}`),
            HelpRequestCalls:
                arg.HelpRequestCalls ||
                nItems(3, () => {
                    return new HelpRequestCallV4APIEntity().sample();
                })
        });
    }
}

export class ResidentV4APIEntity {
    sample(arg = {}) {
        const firstname = arg.FirstName || faker.name.firstName();
        const lastname = arg.LastName || faker.name.lastName();
        const dob = faker.date.past(70);
        const Id = arg.Id || randomInt();
        return Object.freeze({
            Id,
            FirstName: firstname,
            LastName: lastname,
            DobDay: arg.DobDay || dob.getDate().toString(),
            DobMonth: arg.DobMonth || (dob.getMonth() + 1).toString(),
            DobYear: arg.DobYear || dob.getFullYear().toString(),
            ContactTelephoneNumber: arg.ContactTelephoneNumber || randexp(/020\d{8}/),
            ContactMobileNumber: arg.ContactMobileNumber || randexp(/07\d{9}/),
            EmailAddress: arg.EmailAddress || faker.internet.email(firstname, lastname),
            AddressFirstLine: arg.AddressFirstLine || `Flat ${randexp(/[1-9][A-F]?/)}`,
            AddressSecondLine: arg.AddressSecondLine || faker.address.streetAddress(),
            AddressThirdLine:
                arg.AddressThirdLine || Math.random() > 0.1 ? null : randexp(/Hackney(, London)?/),
            Postcode: arg.Postcode || randexp(/[A-Z]{1,2}\d ?\d[A-Z]{2}/),
            Uprn: arg.Uprn || randexp(/1000\d{7}/),
            Ward: arg.Ward || nullOrValue(faker.random.word()),
            IsPharmacistAbleToDeliver: arg.IsPharmacistAbleToDeliver || randomNullableBool(),
            NameAddressPharmacist:
                arg.NameAddressPharmacist ||
                nullOrValue(`${faker.company.companyName()}, ${faker.address.streetAddress()}`),
            GpSurgeryDetails: arg.GpSurgeryDetails || nullOrValue(faker.random.number().toString()),
            NumberOfChildrenUnder18: arg.NumberOfChildrenUnder18 || nullOrValue(randexp(/[0-5]/)),
            ConsentToShare: arg.ConsentToShare || randomNullableBool(),
            RecordStatus: arg.RecordStatus || Math.random() > 0.2 ? 'MASTER' : 'DUPLICATE',
            NhsNumber: arg.NhsNumber || nullOrValue(randexp(/\d{10}/))
        });
    }
}
