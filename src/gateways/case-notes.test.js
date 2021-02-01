import moxios from 'moxios';
import { CaseNotesGateway } from './case-notes.js';
import { getMultipleCaseNotesRequestV4_Speculative } from '../../tools/mockResponses';
import InboundMapper from '../mappers/inboundMapper';

describe('Case notes gateway', () => {
    const csGateway = new CaseNotesGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('gets the casenotes for respective resident id and correctly maps the response', async () => {
        // arrange
        const randomId = Math.floor(Math.random() * 20);
        const mockAxiosResponse = [
            {
                Id: 1,
                CaseNote: 'repudiandae eos est',
                HelpRequestId: 16,
                ResidentId: randomId,
                CreatedAt: '2020-12-25T16:15:41.325Z'
            },
            {
                Id: 2,
                CaseNote: 'vero qui voluptas',
                HelpRequestId: 16,
                ResidentId: randomId,
                CreatedAt: '2021-01-20T05:06:34.567Z'
            }
        ];

        const expectedResponse = [
            {
                id: 1,
                caseNote: 'repudiandae eos est',
                helpRequestId: 16,
                residentId: randomId,
                createdAt: '2020-12-25T16:15:41.325Z'
            },
            {
                id: 2,
                caseNote: 'vero qui voluptas',
                helpRequestId: 16,
                residentId: randomId,
                createdAt: '2021-01-20T05:06:34.567Z'
            }
        ];

        const urlExp = new RegExp('/residents/' + randomId + '/caseNotes$');

        moxios.stubRequest(urlExp, {
            status: 200,
            response: mockAxiosResponse
        });

        // act
        const gatewayResponse = await csGateway.getCaseNotes(randomId);

        // assert
        expect(gatewayResponse).toMatchObject(expectedResponse);
        done();
    });

    it("getCaseNotes method calls the inbound mapper's ToCaseNotes method with expected paramters", async (done) => {
        // arrange
        const mockAxiosResponse = getMultipleCaseNotesRequestV4_Speculative();
        moxios.stubRequest(/residents\/\d+\/caseNotes$/, {
            status: 200,
            response: mockAxiosResponse
        });

        const toCaseNotesSpy = jest.fn();
        const tempRealFunctionPointer = InboundMapper.ToCaseNotes;
        InboundMapper.ToCaseNotes = toCaseNotesSpy;

        // act
        await csGateway.getCaseNotes(0);

        // cleanup
        InboundMapper.ToCaseNotes = tempRealFunctionPointer;

        // assert
        expect(toCaseNotesSpy).toHaveBeenCalledTimes(1);
        expect(toCaseNotesSpy).toHaveBeenCalledWith(mockAxiosResponse);
        done(); //precautionary step to sure the code is sync (to avoid the side effects noise in between tests of modifying the global instances)
    });
});
