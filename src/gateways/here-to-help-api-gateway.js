import axios from 'axios';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body, queryParams) {
        try {
            console.log('HTH API Gateway', method, pathSegments.join('/'), body);
            const { status, data } = await axios.request({
                method,
                baseURL: process.env.HERE_TO_HELP_API_BASE_URL,
                url: `/${pathSegments.join('/')}`,
                params: queryParams,
                data: body,
                headers: {
                    'x-api-key': process.env.HERE_TO_HELP_API_KEY,
                    'Content-Type': 'application/json'
                },
                validateStatus() {
                    return true;
                }
            });
            console.log($`HTH Call status: ${status}`);
            console.log($`HTH Call data: ${data}`);

            return { data, status };
        } catch (err) {
            console.log('CATCH statement of HTH gateway');
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}