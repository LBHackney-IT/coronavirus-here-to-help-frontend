import axios from 'axios';
const { parsePascalToCamelCase, parseCamelToPascalCase } = require('../helpers/utilityFuncs.js');

export class DefaultGateway {

    createFullUrl(url) {
        return `/api/proxy/${url}`;
    }

    async getFromUrl(url) {
        url = this.createFullUrl(url);

        console.log(url);

        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }

    async putToUrl(url, body) {
        parseCamelToPascalCase(body);
        const res = await axios.put(this.createFullUrl(url), body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        parsePascalToCamelCase(res.data);
        return res.data;
    }

    async postToUrl(url, body) {
      const res = await axios.post(this.createFullUrl(url), body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return res.data;
    }

    async patchToUrl(url, body) {
      parseCamelToPascalCase(body);
      //Make patches do a post, but add method=patch in the URL
      const res = await axios.put(this.createFullUrl(url)+"?method=patch", body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return res;
  }
}
