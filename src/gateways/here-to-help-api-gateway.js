import fetch from 'node-fetch';
import { objToQueryStr, isBodyEmptyBuffer } from '../../tools/etcUtility';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body, queryParams) {
        try {
            const requestHasValidBody = body && !isBodyEmptyBuffer(body);

            const constructedUrl = 
                process.env.HERE_TO_HELP_API_BASE_URL + // TODO: Write a helper that takes into account these potential missing slashes at the end: apiv4
                pathSegments.join('/') +
                objToQueryStr(queryParams);

            const request = {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.HERE_TO_HELP_API_KEY
                }
            };

            if (requestHasValidBody) {
                request.body = JSON.stringify(body);
            }

            const rawResponse = await fetch(constructedUrl, request);
            const responseJson = await rawResponse.json();

            return { 
                status: rawResponse.status,
                data: responseJson
            };
        } catch (err) {
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}
