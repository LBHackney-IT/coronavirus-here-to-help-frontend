import fetch from 'node-fetch';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body, queryParams) {
        try {
            const constructedUrl = 
                process.env.HERE_TO_HELP_API_BASE_URL +
                pathSegments.join('/') +
                '?' + // TODO: make this a conditional based on the URL Serch Params object contents
                new URLSearchParams(queryParams);

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
