import { authoriseUser } from '../../../helpers/auth';
import { HereToHelpApiGateway } from '../../../gateways/here-to-help-api-gateway';

const hereToHelpApiGateway = new HereToHelpApiGateway();

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    const path = req.query.path;

    // Allow a URL parameter to switch request method, as PATCH doens't play well with Lambda Next
    if(req.url.indexOf('?method=patch')!==-1) req.method = 'PATCH';

    try {
        
       const queryParams = Object.keys(req.query).reduce((object, key) => {
        if (key !== 'path') {
            object[key] = req.query[key]
        }
        return object
        }, {})

        const { status, data } = await hereToHelpApiGateway.request(path, req.method, req.body, queryParams);

        res.status(status).json(data);
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: `Server error` });
    }
};

export default endpoint;