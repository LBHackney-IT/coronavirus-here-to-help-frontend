import { authoriseUser } from '../../../../helpers/auth';
import { GovNotifyGateway } from '../../../../gateways/gov-notify-api-gateway';

const govNotifyGateway = new GovNotifyGateway();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const { path, ...queryParams } = req.query;

        const response =  await govNotifyGateway.request(
            path,
            queryParams
        );

        res.json(response.data)
    } catch (error) {
        console.log('Error:' + error );
        res.json(error);
    }
};

export default endpoint;
