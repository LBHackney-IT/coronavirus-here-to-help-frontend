import moxios from 'moxios';
import { ResidentGateway } from './resident.js';

describe('Resident gateway', () => {
    const resGateway = new ResidentGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('gets the resident by id and correctly maps the response', async () => {
        // arrange
        const randomId = Math.floor(Math.random() * 20);
        const mockAxiosResponse = 
            {
                Id: 1,
                FirstName: "Russell",
                LastName: "Botsford",
                DobDay: "01",
                DobMonth: "01",
                DobYear: "1953",
                ContactMobileNumber: "07084246866",
                ContactTelephoneNumber: "02094644146",
                EmailAddress: "Russell26@yahoo.com",
                AddressFirstLine: "Flat 2",
                AddressSecondLine: "9570 Gorczany Ford",
                AddressThirdLine: "",
                Postcode: "H6 3VA",
                Uprn: "10007630135",
                NhsNumber: "2106107057",
            };

        const expectedResponse = 
            {
                id: 1,
                firstName: "Russell",
                lastName: "Botsford",
                dobDay: "01",
                dobMonth: "01",
                dobYear: "1953",
                contactMobileNumber: "07084246866",
                contactTelephoneNumber: "02094644146",
                addressFirstLine: "Flat 2",
                addressSecondLine: "9570 Gorczany Ford",
                addressThirdLine: "",
                emailAddress: "Russell26@yahoo.com",
                postCode: "H6 3VA",
                uprn: "10007630135",
                nhsNumber: "2106107057",
            };

        const urlExp = new RegExp('v4/residents/' + randomId);

        moxios.stubRequest(urlExp, {
            status: 200,
            response: mockAxiosResponse
        });

        // act
        const gatewayResponse = await resGateway.getResident(randomId);

        // assert
        expect(gatewayResponse).toMatchObject(expectedResponse);
    });
});


