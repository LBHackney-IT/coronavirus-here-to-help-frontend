import { authoriseUser } from '../../../helpers/auth';
import { HereToHelpApiGateway } from '../../../gateways/here-to-help-api-gateway';
import { EUSS_GROUP } from '../../../helpers/constants';

const hereToHelpApiGateway = new HereToHelpApiGateway();
const eussType = 'EUSS';
const includeHelpTypeParam = 'includeType';

const authoriseQuery = (req, user) => {
    let query = req.query;
    if (user.groups?.includes(EUSS_GROUP) && req.method == 'GET')
        query[includeHelpTypeParam] = eussType;
    return query;
};

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        const { path, ...queryParams } = authoriseQuery(req, user);
        const { status, data } = await hereToHelpApiGateway.request(
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
