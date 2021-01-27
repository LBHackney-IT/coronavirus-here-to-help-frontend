import axios from 'axios';

export class HereToHelpApiGateway {
    async request(pathSegments, method, body) {
        try {
            const { status, data } = await axios.request({
                method,
                baseURL: process.env.HERE_TO_HELP_API_BASE_URL,
                url: `/${pathSegments.join('/')}`,
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