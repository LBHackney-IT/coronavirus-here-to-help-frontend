import { authoriseUser } from '../../../../helpers/auth';
import { AddressesGateway } from '../../../../gateways/addresses-api-gateway';

const addressesGateway = new AddressesGateway();

const endpoint = async (req, res) => {
    console.log("proxy")
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const { path, ...queryParams } = req.query;

        const { status, data } = await addressesGateway.request(
            path,
            req.method,
            req.body,
            queryParams
        );

        res.status(status).json(data);
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: `Server error` });
    }
};

export default endpoint;
