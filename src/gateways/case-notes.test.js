import moxios from 'moxios';
import { CaseNotesGateway } from './case-notes.js';
import { getMultipleCaseNotesV4_Speculative } from '../../tools/mockResponses';
import { postSingleCaseNoteV4Body_Speculative } from '../../tools/mockRequestBodies';
import InboundMapper from '../mappers/inboundMapper';

describe('Case notes gateway', () => {
    const caseNotesGateway = new CaseNotesGateway();
    let residentId = 3;
    let getResidentCaseNotesUrl = new RegExp(`/v4/residents/${residentId}/case-notes`)
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        jest.clearAllMocks();
        moxios.uninstall();
    });

    it('getCaseNotes method makes GET axios call to a correct url, with correct route parameter', async (done) => {
        // arrange // random path parameter to be checked for later

        // dummy set up, so axios wouldn't timeout waiting for a response
        moxios.stubRequest(getResidentCaseNotesUrl, {
            status: 200,
            response: [] // return value is irrelevant for this test, [] so it wouldn't distract from what the test is doing
        });

        // act
        await caseNotesGateway.getResidentCaseNotes(residentId);

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(getResidentCaseNotesUrl); // tests url & route param at the same time
        done();
    });

    it("getResidentCaseNotes method calls the inbound mapper's ToCaseNotes method with expected paramters and return the corrext response", async (done) => {

        const mockAxiosResponse = {
            "CaseNotes":[
            {
              "Id": residentId,
              "HelpRequestId": 15,
              "ResidentId": residentId,
              "CaseNote": "[{\"author\":\"Bilbo Baggins\",\"noteDate\":\"Thu, 7 Sep 2020 16:56:06 GMT\",\"note\":\"*** CREATED ***\"}]"
            }
        ]
    }
        let expectedResponse = [
            {
                caseNote: 
                    [
                        {
                            author: "Bilbo Baggins", 
                            formattedDate: "2020-09-07 17:56", 
                            note: "*** CREATED ***", 
                            noteDate: "Thu, 7 Sep 2020 16:56:06 GMT"
                        }
                    ], 
                helpRequestId: 15, 
                id: 3, 
                residentId: residentId
            }
        ]
            

        moxios.stubRequest(getResidentCaseNotesUrl, {
            status: 200,
            response: mockAxiosResponse
        });
        let toCaseNotesSpy = jest.spyOn(InboundMapper, 'ToCaseNotes')

        let gatewayResponse = await caseNotesGateway.getResidentCaseNotes(residentId)

        expect(gatewayResponse).toEqual(expectedResponse)
        expect(toCaseNotesSpy).toBeCalledTimes(1)
        expect(toCaseNotesSpy).toBeCalledWith(mockAxiosResponse)
        done()
    });

    it("getHelpRequestCaseNotes method calls the inbound mapper's ToCaseNotes method with expected paramters and return the corrext response", async (done) => {
        let residentId = 3;
        let helpRequestId = 15
        let getHelpRequestCaseNotesUrl = new RegExp(`/v4/residents/${residentId}/help-requests/${helpRequestId}/case-notes`)

        const mockAxiosResponse =  {"CaseNotes": [
            {
              "Id": residentId,
              "HelpRequestId": helpRequestId,
              "ResidentId": residentId,
              "CaseNote": "[{\"author\":\"Bilbo Baggins\",\"noteDate\":\"Thu, 7 Sep 2020 16:56:06 GMT\",\"note\":\"*** CREATED ***\"}]"
            }
        ]}
        let expectedResponse = [
            {
                caseNote: 
                    [
                        {
                            author: "Bilbo Baggins", 
                            formattedDate: "2020-09-07 17:56", 
                            note: "*** CREATED ***", 
                            noteDate: "Thu, 7 Sep 2020 16:56:06 GMT"
                        }
                    ], 
                helpRequestId: helpRequestId, 
                id: 3, 
                residentId: residentId
            }
        ]
            

        moxios.stubRequest(getHelpRequestCaseNotesUrl, {
            status: 200,
            response: mockAxiosResponse
        });
        let toCaseNotesSpy = jest.spyOn(InboundMapper, 'ToCaseNotes')

        let gatewayResponse = await caseNotesGateway.getHelpRequestCaseNotes(residentId, helpRequestId)

        expect(gatewayResponse).toEqual(expectedResponse)
        expect(toCaseNotesSpy).toBeCalledTimes(1)
        expect(toCaseNotesSpy).toBeCalledWith(mockAxiosResponse)
        done()
    });

    it('postCaseNote method makes POST axios call to a correct url, with correct route parameters & body', async (done) => {
        // arrange
        const randomResidentId = Math.floor(Math.random() * 20);
        const randomHelpRequestId = Math.floor(Math.random() * 20);
        const mockDomainCaseNoteBody = postSingleCaseNoteV4Body_Speculative({
            // non-essential set up now, but might become relevant if we do validation of path params against request body in the future
            residentId: randomResidentId,
            helpRequestId: randomHelpRequestId
        });
        moxios.stubRequest(/.+/, {
            status: 200,
            response: 0 // assuming endpoint only return's object id, though the value here is irrelevant
        });
        const urlExp = new RegExp(
            `residents/${randomResidentId}/help-requests/${randomHelpRequestId}/caseNotes$`
        );

        // act
        await caseNotesGateway.postCaseNote(randomResidentId, randomHelpRequestId, mockDomainCaseNoteBody);

        // assert
        let request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('post');
        expect(request.url).toMatch(urlExp); // tests url & route params at the same time
        expect(request.config.data).toContain(mockDomainCaseNoteBody.caseNote); // essentially a check whether the request body exists or not upon axios call
        done();
    });

    // TODO: Add a test to check whether POST case note gateway method calls Domain -> API entity mapper.
    // Currently it doesn't, so it's a good chance to implement that. This mapper would need to be under Outbound mappers
    // file.
});
