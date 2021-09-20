import { authoriseUser } from '../../../helpers/auth';

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        let response = [];
        if (user?.groups.includes('Here To Help EUSS Outbound Calls')) response.push('EUSS');

        return res.json(response);
    } catch (err) {
        console.log('Error: ' + err);
        res.json({ error: `Server error` });
    }
};

export default endpoint;
