import fetch from 'node-fetch';

export class AddressesGateway {
    async request(pathSegments, method) {

        try {
            const constructedUrl = `${process.env.ADDRESSES_API_URL}?postcode=${pathSegments[0]}`;

            const request = {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ADDRESSES_API_TOKEN}`
                }
            };

            const rawResponse = await fetch(constructedUrl, request);
            const parsedResponse = await rawResponse.json();

            return { 
                status: parsedResponse.statusCode,
                data: parsedResponse.data
            };
        } catch (err) {
            console.log('Error: ' + err);
            return { status: 500 };
        }
    }
}
