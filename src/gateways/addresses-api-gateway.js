import axios from 'axios';

export class AddressesGateway {
    async request(pathSegments, method, body, queryParams) {
        console.log("this got called with")
        console.log(pathSegments, method, body, queryParams)
        try {
            const { status, data } = await axios.request({
                method,
                baseURL: process.env.ADDRESSES_API_URL,
                url: `/${pathSegments.join('/')}`,
                params: queryParams,
                data: body,
                headers: {
                    'data-api-key': process.env.ADDRESSES_API_KEY,
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
