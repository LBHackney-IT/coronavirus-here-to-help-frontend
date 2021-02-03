import axios from 'axios';

export class AddressesGateway {
    async request(pathSegments, method, body, queryParams) {

        try {
            const { status, data } = await axios.request({
                method,
                url: `${process.env.ADDRESSES_API_URL}?postcode=${pathSegments[0]}`,
                headers: {
                    Authorization: `Bearer ${process.env.ADDRESSES_API_TOKEN}`
                },
                validateStatus() {
                    return true;
                }
            });

            return { data: data.data, status };
        } catch (err) {
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}
