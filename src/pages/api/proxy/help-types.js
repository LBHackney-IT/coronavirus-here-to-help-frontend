import { authoriseUser } from '../../../helpers/auth';
import { EUSS_GROUP, HELP_TYPE } from '../../../helpers/constants';

const endpoint = async (req, res) => {
    const user = authoriseUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorised' });

    try {
        let response = [];
        if (user?.groups.includes(EUSS_GROUP)) response.push({ name: HELP_TYPE.EUSS });

        return res.json(response);
    } catch (err) {
        console.log('Error: ' + err);
        res.json({ error: `Server error` });
    }
};

export default endpoint;
