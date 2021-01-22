import axios from 'axios';
const { parsePascalToCamelCase, parseCamelToPascalCase } = require('../helpers/utilityFuncs.js');

export class DefaultGateway {
    host = 'http://localhost:3001';

    createFullUrl(url) {
        return `${this.host}/${url}`;
    }

    async getFromUrl(url) {
        url = this.createFullUrl(url);

        console.log(url);

        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //parsePascalToCamelCase(res.data);
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

    async patchToUrl(url, body) {
      parseCamelToPascalCase(body);
      const res = await axios.patch(this.createFullUrl(url), body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return res;
  }
}
