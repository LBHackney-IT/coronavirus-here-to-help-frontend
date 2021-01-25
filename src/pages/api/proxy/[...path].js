import { authoriseUser } from '../../../helpers/auth';
import { HereToHelpApiGateway } from '../../../gateways/here-to-help-api-gateway';

const hereToHelpApiGateway = new HereToHelpApiGateway();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    const path = req.query.path;

    try {
        const { status, data } = await hereToHelpApiGateway.request(path, req.method, req.body);

        res.status(status).json(data);
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: `Server error` });
    }
};

export default endpoint;