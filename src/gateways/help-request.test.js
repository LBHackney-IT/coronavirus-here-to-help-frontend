import moxios from 'moxios';
import { HelpRequestGateway } from './help-request';

describe('Help request gateway', () => {
    const hrGateway = new HelpRequestGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('getHelpRequests method makes GET axios call to a correct url, with correct route parameter', async (done) => {
        const urlExp = new RegExp('v4/residents/13');
        
        moxios.stubRequest(/.+/, {
            status: 200,
            response: [] 
        });

        // act
        await hrGateway.getHelpRequests(13);

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(urlExp);
        done();
    });
});