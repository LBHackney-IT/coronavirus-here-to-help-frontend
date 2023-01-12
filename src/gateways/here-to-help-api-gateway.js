import fetch from 'node-fetch';
import { objToQueryStr } from '../../tools/etcUtility';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body, queryParams) {
        try {
            const constructedUrl = 
                process.env.HERE_TO_HELP_API_BASE_URL + // TODO: Write a helper that takes into account these potential missing slashes at the end: apiv4
                pathSegments.join('/') +
                objToQueryStr(queryParams);

            const request = {
                method: method,
                body: body ? JSON.stringify(body) : undefined,
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.HERE_TO_HELP_API_KEY
                }
            };

            const rawResponse = await fetch(constructedUrl, request);

            return { 
                status: rawResponse.status,
                data: await rawResponse.json()
            };
        } catch (err) {
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}
