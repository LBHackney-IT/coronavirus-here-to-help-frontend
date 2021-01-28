import moxios from 'moxios';
import { CaseNotesGateway } from './case-notes.js';

describe('Case notes gateway', () => {
    const csGateway = new CaseNotesGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('200 Success "/residents/:residendId/caseNotes"', async () => {
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
    });
});
