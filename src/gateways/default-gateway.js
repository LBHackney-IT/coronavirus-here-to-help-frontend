import axios from 'axios';
import { parsePascalToCamelCase, parseCamelToPascalCase } from '../utility/utilityFuncs';

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

        return res.data;
    }

    async putToUrl(url, body) {
        const res = await axios.put(this.createFullUrl(url), body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
}
