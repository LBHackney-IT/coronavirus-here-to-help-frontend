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

    it('getResident method makes GET axios call to a correct url, with correct route parameter', async (done) => {
        // arrange
        const randomId = Math.floor(Math.random() * 20);
        const urlExp = new RegExp('v4/residents/' + randomId);
        
        moxios.stubRequest(/.+/, {
            status: 200,
            response: [] 
        });

        // act
        await resGateway.getResident(randomId);

        // assert
        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('get');
        expect(request.url).toMatch(urlExp);
        done();
    });
});


