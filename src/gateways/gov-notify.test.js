import moxios from 'moxios';
import { GovNotifyGateway } from "./gov-notify.js";

describe('Case notes gateway', () => {
    const govNotifyGateway = new GovNotifyGateway();
    const message = "message"

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        jest.clearAllMocks();
        moxios.uninstall();
    });

    it('sendText method makes GET axios call to a correct url, with correct route parameter and response', async (done) => {
        let phoneNumber = "number"
        let sendTextUrl = `/api/proxy/gov-notify/${message}?phoneNumber=${phoneNumber}`

        moxios.stubRequest(sendTextUrl, {
            status: 200,
            response: {
              body:"preview"
            }  
        });

        let response = await govNotifyGateway.sendText(phoneNumber, message);

        const request = moxios.requests.mostRecent();
        expect(request.config.method).toEqual('post');
        expect(request.url).toMatch(sendTextUrl); 
        expect(response.body).toBe("preview")
        done();
    });

    it('sendEmail method makes GET axios call to a correct url, with correct route parameter and response', async (done) => {
      let email = "email"
      let sendEmailUrl =`/api/proxy/gov-notify/${message}?email=${email}`

      moxios.stubRequest(sendEmailUrl, {
          status: 200,
          response: {
            body:"preview"
          } 
      });

      let response = await govNotifyGateway.sendEmail(email, message);

      const request = moxios.requests.mostRecent();
      expect(request.config.method).toEqual('post');
      expect(request.url).toMatch(sendEmailUrl); 
      expect(response.body).toBe("preview")
      done();
    });

    it('getTemplatePreview method makes GET axios call to a correct url, with correct route parameter and response', async (done) => {
      let sendEmailUrl =`/api/proxy/gov-notify/previewTemplate?templateType=${message}`

      moxios.stubRequest(sendEmailUrl, {
          status: 200,
          response: {
            body:"preview"
          } 
      });

      let response = await govNotifyGateway.getTemplatePreview(message);

      const request = moxios.requests.mostRecent();
      expect(request.config.method).toEqual('get');
      expect(request.url).toMatch(sendEmailUrl); 
      expect(response.body).toBe("preview")
      done();
    });

    it('getTemplatePreview method makes GET axios call to a correct url, with correct route parameter', async (done) => {
      let sendEmailUrl =`/api/proxy/gov-notify/previewTemplate?templateType=${message}`

      moxios.stubRequest(sendEmailUrl, {
          status: 200,
          response: 
            "Error Error: Request failed with status code 400"

      });

      let response = await govNotifyGateway.getTemplatePreview(message);

      const request = moxios.requests.mostRecent();
      expect(request.config.method).toEqual('get');
      expect(request.url).toMatch(sendEmailUrl); 
      expect(response).toBe("Error Error: Request failed with status code 400")
      done();
    });


  })
