import moxios from 'moxios';
import { CallbackGateway } from './callback';


describe('Help request gateway', () => {
    const cbGateway = new CallbackGateway();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('getCallback method makes GET axios call to a correct url, with correct route parameter', async (done) => {
        const urlExp = "v3/help-requests/callbacks"
        
        moxios.stubRequest(/.+/, {
            status: 200,
            response: [] 
        });

        // act
        await cbGateway.getCallback();

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(urlExp);
        done();
    });
});