import axios from 'axios';
const { parsePascalToCamelCase, parseCamelToPascalCase } = require('../helpers/utilityFuncs.js');

export class DefaultGateway {
    constructor() {
        this.host = process.env.HERE_TO_HELP_API_BASE_URL;
    }

    createFullUrl(url) {
        return `${this.host}/${url}`;
    }

    async getFromUrl(url) {
        url = this.createFullUrl(url);

        console.log(url);

        const res = await axios.get(url, {
            headers: {
                'X-API-Key': `${process.env.HERE_TO_HELP_API_KEY}`,
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
                'X-API-Key': `${process.env.HERE_TO_HELP_API_KEY}`,
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
                'X-API-Key': `${process.env.HERE_TO_HELP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return res;
    }
}
