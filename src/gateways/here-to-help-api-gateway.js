import axios from 'axios';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body, queryParams) {
        console.log("pathSegments, method, body")
        console.log(`/${pathSegments.join('/')}`, method, body)
        try {
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

            return { data, status };
        } catch (err) {
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}