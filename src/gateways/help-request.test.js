import moxios from 'moxios';
import InboundMapper from '../mappers/inboundMapper';
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
        const randomId = Math.floor(Math.random() * 20);
        const urlExp = new RegExp('v4/residents/' + randomId);
        
        moxios.stubRequest(/.+/, {
            status: 200,
            response: [] 
        });

        // act
        await hrGateway.getHelpRequests(randomId);

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(urlExp);
        done();
    });
});