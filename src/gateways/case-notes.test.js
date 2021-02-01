import moxios from 'moxios';
import { CaseNotesGateway } from './case-notes.js';
import { getMultipleCaseNotesV4_Speculative } from '../../tools/mockResponses';
import { postSingleCaseNoteV4Body_Speculative } from '../../tools/mockRequestBodies';
import InboundMapper from '../mappers/inboundMapper';

describe('Case notes gateway', () => {
    const csGateway = new CaseNotesGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('getCaseNotes method makes GET axios call to a correct url, with correct route parameter', async (done) => {
        // arrange
        const randomId = Math.floor(Math.random() * 20); // random path parameter to be checked for later
        const urlExp = new RegExp('/residents/' + randomId + '/caseNotes$');

        // dummy set up, so axios wouldn't timeout waiting for a response
        moxios.stubRequest(/.+/, {
            status: 200,
            response: [] // return value is irrelevant for this test, [] so it wouldn't distract from what the test is doing
        });

        // act
        await csGateway.getCaseNotes(randomId);

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(urlExp); // tests url & route param at the same time

        // clean up
        done();
    });

    it("getCaseNotes method calls the inbound mapper's ToCaseNotes method with expected paramters", async (done) => {
        // arrange
        const mockAxiosResponse = getMultipleCaseNotesV4_Speculative();
        moxios.stubRequest(/residents\/\d+\/caseNotes$/, {
            status: 200,
            response: mockAxiosResponse
        });

        const toCaseNotesSpy = jest.fn();
        const tempRealFunctionPointer = InboundMapper.ToCaseNotes;
        InboundMapper.ToCaseNotes = toCaseNotesSpy;

        // act
        await csGateway.getCaseNotes(0);

        // assert
        expect(toCaseNotesSpy).toHaveBeenCalledTimes(1);
        expect(toCaseNotesSpy).toHaveBeenCalledWith(mockAxiosResponse);

        // clean up
        InboundMapper.ToCaseNotes = tempRealFunctionPointer;
        done(); //precautionary step to sure the code is sync (to avoid the side effects noise in between tests of modifying the global instances)
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
        await csGateway.postCaseNote(randomResidentId, randomHelpRequestId, mockDomainCaseNoteBody);

        // assert
        let request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('post');
        expect(request.url).toMatch(urlExp); // tests url & route params at the same time
        expect(request.config.data).toContain(mockDomainCaseNoteBody.caseNote); // essentially a check whether the request body exists or not upon axios call
        // clean up
        done();
    });

    // TODO: Add a test to check whether POST case note gateway method calls Domain -> API entity mapper.
    // Currently it doesn't, so it's a good chance to implement that. This mapper would need to be under Outbound mappers
    // file.
});
