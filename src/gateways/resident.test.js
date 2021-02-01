import moxios from 'moxios';
import { ResidentGateway } from './resident.js';
import InboundMapper from '../mappers/inboundMapper';
import { getSingleResidentV4 } from '../../tools/mockResponses';

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

    it("getResident method calls the inbound mapper's ToResident method with expected paramters", async (done) => {
        // arrange
        const mockAxiosResponse = getSingleResidentV4();

        moxios.stubRequest(/v4\/residents\/\d+$/, {
            status: 200,
            response: mockAxiosResponse
        });

        const toResidentSpy = jest.fn();
        const tempRealFunctionPointer = InboundMapper.ToResident;
        InboundMapper.ToResident = toResidentSpy;

        // act
        await resGateway.getResident(10);
        const request = moxios.requests.mostRecent();

        // assert
        expect(toResidentSpy).toHaveBeenCalledTimes(1);
        expect(toResidentSpy).toHaveBeenCalledWith(mockAxiosResponse);

        InboundMapper.ToResident = tempRealFunctionPointer;
        done();
    });
});


